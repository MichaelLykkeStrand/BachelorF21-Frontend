import axios from "axios";

export function post(req, res) {
    req.session.accessToken = req.body.accessToken;
    req.session.userId = req.body.userId;
    axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.accessToken}`};
    res.writeHead(200, {
        'Content-Type': 'application/json'    
    });

    res.end();
}