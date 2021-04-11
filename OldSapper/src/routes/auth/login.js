import axios from "axios";

export function post(req, res){
    try {
        let data;
        login(req).then((response) => {
            data = response.data;
            req.session.token = response.data.token;
            req.session.userId = response.data.userId;
        }).then(()=>{
            res.end(JSON.stringify(data));
        }
        );
        
        // const resp = await axios.post(
        //     "auth/token",
        //     {token: response.data.accessToken, userId: response.data.userId}
        // );
        // axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.accessToken}`}
        // $session.accessToken = response.data.accessToken;
        // $session.refreshToken = response.data.refreshToken;
        // $session.userId = response.data.userId;
        // goto("/main");
    } catch (err) {
        console.log("Error in login.js: " + err);
    }

}

async function login(req){
    const response = await axios.post(
        "http://localhost:3600/auth",
        req.body
    );
    return response;    
}