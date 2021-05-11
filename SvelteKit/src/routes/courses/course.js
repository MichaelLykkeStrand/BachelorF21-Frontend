import * as api from '$lib/api.js';

export async function get({ query, context}){
    const resp = await api.get("courses/"+query.get("courseId"), context.user.token);
	return respond(resp);
}


export async function post({query, body, context}){
	console.log(body);
    const resp = await api.post("courses/",body,context.user.token);
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