export async function post(endpoint, data) {
	const fetch =
		typeof window !== 'undefined'
			? window.fetch
			: await import('node-fetch').then((mod) => mod.default);

	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}

export async function get(endpoint, data) {
	const fetch =
		typeof window !== 'undefined'
			? window.fetch
			: await import('node-fetch').then((mod) => mod.default);

	console.log(`API TOTALLY NOT ABSOLUTE ENDPOINT:  ${endpoint}`);

	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}