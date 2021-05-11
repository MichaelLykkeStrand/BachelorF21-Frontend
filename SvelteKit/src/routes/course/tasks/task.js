import * as api from '$lib/api.js';

export async function get({ query, context}){
    const resp = await api.get("courses/task/"+query.get("taskId"), context.user.token);
    console.log("TASK API RESPONMSE: "+ resp);
	return respond(resp);
}


export async function patch({query, body, context}){
	console.log(body);
    const resp = await api.patch("coursesTask/",body,context.user.token);

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