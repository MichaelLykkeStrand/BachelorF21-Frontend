import * as cookie from '$lib/cookie.js';

export function getContext({ headers }){
    const cookies = cookie.parse(headers.cookie || "");
    const jwt = cookies.jwt && Buffer.from(cookies.jwt, "base64").toString("utf8");

    return {
        user: jwt ? JSON.parse(jwt) : null
    };
}

export function getSession({ context }) {
    return{
        user: context.user && {
            userId: context.user.userId,
            token: context.user.token
        }
    }
}