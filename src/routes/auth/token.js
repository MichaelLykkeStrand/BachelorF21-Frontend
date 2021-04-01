export function post(req, res) {
    req.session.token = req.body.token;
    req.session.userId = req.body.userId;

    res.writeHead(200, {
        'Content-Type': 'application/json'    
    });

    res.end();
}