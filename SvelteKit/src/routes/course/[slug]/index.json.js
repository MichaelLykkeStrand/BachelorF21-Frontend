import * as api from '$lib/api.js';
// import { courses } from '../_courses'

export async function get({ params, context }){
    try {
        const { slug } = params;
        let course = await getCourse(slug, context.user.token);
        return {
            body: course,
            headers: {
                'Content-Type': 'application/json'
            }
		};
    } catch (err) {
        console.log(err);
    }
}

async function getCourse(courseId, token){
    let resp = await api.get(`courses/${courseId}`, token);
    
    return resp;    
}