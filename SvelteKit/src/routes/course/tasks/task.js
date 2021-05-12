import * as api from '$lib/api.js';

export async function get({ query, context}){
	console.log("Get called");
    const resp = await api.get("courses/task/"+query.get("taskId"), context.user.token);
	return respond(resp);
}

export async function post({query, body, context}){
	console.log(body);
    const resp = await api.post("coursesTask/",body,context.user.token);
	return respond(resp);
}

export async function patch({query, body, context}){
	console.log("Patch called");
    const resp = await api.patch("coursesTask/",body,context.user.token);
	return respond(resp);
}

export async function del({ query, context}){
	console.log("Delete called: "+query.get("taskId"));
	const resp = await api.del("coursesTask/"+query.get("taskId"), context.user.token);
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