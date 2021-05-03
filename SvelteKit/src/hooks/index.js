import * as cookie from '$lib/cookie.js';

export function getContext({ headers }){
    const cookies = cookie.parse(headers.cookie || "");
    const jwt = cookies.jwt && Buffer.from(cookies.jwt, "base64").toString("utf8");

    return {
        user: jwt ? JSON.parse(jwt) : null
    };
}

export function getSession({ context }) {
    console.log(context.user)
    return{
        user: context.user && {
            userId: context.user.userData.userId,
            userData: context.user.userData,
            token: context.user.token,
        }
    }
}