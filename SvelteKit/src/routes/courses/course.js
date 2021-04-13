import * as api from '$lib/api.js';

export async function get({ query, context}){
    const resp = await api.get("courses/"+query.get("courseId"), context.user.token);
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