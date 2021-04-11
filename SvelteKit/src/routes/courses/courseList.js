import * as api from '$lib/api.js';

export async function post({ params, context }){
	const resp = await api.get("users/courses/" + context.user.userId, context.user.token);
	// getCourses(context).then((r) => {return r}).catch((err) => {console.log(err)});
	// console.log("Resp: " + resp.courses);
	// return resp.courses;
	let user = { email: "", password: "" };
	return respond(resp);
}

async function getCourses(context){
	const resp = await api.get("users/courses/" + context.user.userId, context.user.token);
	console.log("Resp: " + resp.courses);
	let user = { email: "", password: "" };
	return user;	
}

function respond(body) {
	if (body.errors) {
		return { status: 401, body };
	}
	return {
		body
	};
}