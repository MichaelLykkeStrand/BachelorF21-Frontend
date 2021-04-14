import * as api from '$lib/api.js';
// import { courses } from '../_courses'

export async function get({ params, context }){
    try {
        const { slug } = params;
        console.log("2");
        let course = await getCourse(slug, context.user.token);
        console.log("3");
        // courseName = JSON.stringify(course);
        //console.log(course);
        // if (courseName){
        //     //console.log(resp.name);
        //     return courseName;
        // }
        return {
            body: course,
            headers: {
                'Content-Type': 'application/json'
            }
		};
    } catch (err) {
        console.log('yep cock :' + err);
    }
}

async function getCourse(courseId, token){
    let resp = await api.get(`courses/${courseId}`, token);
    
    return resp;    
}