import * as api from '$lib/api.js';

export async function post({query, body, context}){
	console.log(body);
	console.log("PostCoursesTaskCompleted called");
    const resp = await api.post("coursesTaskCompleted/",body,context.user.token);
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