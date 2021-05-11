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

	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());

}

export async function patch(endpoint, data) {
	console.log("called :)"+Object.getOwnPropertyNames(data));
	const fetch =
		typeof window !== 'undefined'
			? window.fetch
			: await import('node-fetch').then((mod) => mod.default);

	return fetch(endpoint, {
		method: 'PATCH',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}