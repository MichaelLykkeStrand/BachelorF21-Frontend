import * as api from '$lib/api.js';

export async function post({query, body, context}){
	console.log("Get called");
    //TODO
    const resp = await api.get("progress/"+body.taskId+"/"+body.userId, context.user.token);
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