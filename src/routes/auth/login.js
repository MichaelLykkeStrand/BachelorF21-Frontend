// import axios from "axios";

// export function post(req, res){
//     try {
//         const response = await axios.post(
//             "http://localhost:3600/auth",
//             user
//         );
//         const resp = await axios.post(
//             "auth/token",
//             {token: response.data.accessToken, userId: response.data.userId}
//         );
//         axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.accessToken}`}
//         $session.accessToken = response.data.accessToken;
//         $session.refreshToken = response.data.refreshToken;
//         $session.userId = response.data.userId;
//         goto("/main");
//     } catch (err) {
//         console.log("i failed :)" + err);
//     }

// }