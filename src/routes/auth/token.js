import axios from "axios";

export function post(req, res) {
    req.session.token = req.body.token;
    req.session.userId = req.body.userId;
    axios.defaults.headers.common = {'Authorization': `Bearer ${req.body.token}`};
    res.writeHead(200, {
        'Content-Type': 'application/json'    
    });

    res.end();
}