import axios from "axios";

export async function post(req, res){
    try {
        let token = req.body.token;
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
        
        const response = await axios.get(
            ("http://localhost:3600/users/courses/" + req.body.userId)
        );
        res.data = response.data.courses;
        res.end(JSON.stringify(response.data.courses));
    } catch (err) {
        console.log("sapper server failed at getting courses, with error: " + err);
    }
}