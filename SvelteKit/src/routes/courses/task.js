import * as api from '$lib/api.js';

export async function get({ query, context}){
    const resp = await api.get("courses/task/"+query.get("taskId"), context.user.token);
    console.log("TASK API RESPONMSE: "+ resp);
	return respond(resp);
}

function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}
	return {
		body
	};
}