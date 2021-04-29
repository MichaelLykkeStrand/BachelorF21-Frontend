import * as api from '$lib/api.js';

export async function post(req){
    const res = await api.post("auth", 
        req.body
    );
	console.log("RES: " + res);
    return respond(res);
}

function respond(body) {
	if (!body.user) {
		return { status: 401, body };
	}

	const json = JSON.stringify(body.user);
	const value = Buffer.from(json).toString('base64');

	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/`
		},
		body
	};
}