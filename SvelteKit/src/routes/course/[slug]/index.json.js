import * as api from '$lib/api.js';
// import { courses } from '../_courses'

export async function get({ params, context }){
    try {
        const { slug } = params;
        let courseName = await getCourse(slug, context.user.token);
        // courseName = JSON.stringify(courseName);
        console.log(courseName);
        // if (courseName){
        //     //console.log(resp.name);
        //     return courseName;
        // }
        // return {
        //     headers: ```'Content-Type': 'application/json'```,
		// 	body: courseName
		// };
    } catch (err) {
        console.log('yep cock :' + err);
    }
}

async function getCourse(courseId, token){
    let resp = await api.get(`courses/${courseId}`, token);
    
    return resp.name;    
}