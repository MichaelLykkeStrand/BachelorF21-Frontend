const base = 'http://localhost:3600';
let token = ''

async function send({ method, path, data, token }) {
    const opts = { method, headers: {} };
    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }
    if (token) {
        opts.headers['Authorization'] = `Bearer ${token}`;
    }

    const fetch =
        typeof window !== 'undefined'
            ? window.fetch
            : await import('node-fetch').then((mod) => mod.default);
    console.log(`${base}/${path}`);
    return fetch(`${base}/${path}`, opts)
        .then((r) => r.text())
        .then((json) => {
            try {
                console.log("JSON:"+json);
                return JSON.parse(json);
            } catch (err) {
                return json;
            }
        }).catch(err => {return err});
}

export function get(path, token) {
    console.log("GET: "+ path);
    return send({ method: 'GET', path, token });
}

export function del(path, token) {
    console.log("DELETE: "+path);
    return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
    console.log("PATCH: "+data);
    return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
    return send({ method: 'PUT', path, data, token });
}

export function patch(path, data, token) {
    return send({ method: 'PATCH', path, data, token });
}