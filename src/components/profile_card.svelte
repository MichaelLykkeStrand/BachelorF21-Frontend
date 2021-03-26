<script>
	import { goto, stores } from "@sapper/app";
	import axios from "axios";

    let user = { email: "pehun18@student.sdu.dk", password: "RqPC9hAKz77DmNE" };
	const { session } = stores();
	let inProgress = false;

    const config = {
        headers: { Authorization: `Bearer ` + $session.accessToken }
    };

    async function refreshToken() {
        let refresh_token = {refresh_token : $session.refreshToken};
        const response = await axios.post(
            ("http://localhost:3600/auth/refresh"),
            refresh_token
        );
        $session.accessToken = response.data.accessToken;
        axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.accessToken}`}
		$session.refreshToken = response.data.refreshToken;
    }

	async function submit() {
		try {
			//inProgress = true;
			const response = await axios.get(
				("http://localhost:3600/users/" + $session.userId),
                "",
                config
			);
			//inProgress = false;
			//error = null;
			user = response.data;
			goto("/main");
		} catch (err) {
			//error = err.response.data.message;
			console.log("i failed :)" + err);
			inProgress = false;
		}
	}

    submit().catch(refreshToken().then(submit()));
</script>



<div class="container shadow py-2">
    <div class="row">
        <div class="col-4 d-flex">
            <img src="http://placehold.it/150X150" class="rounded-circle" />
        </div>
        <div class="col ">
            <h2 class="font-weight-light">{user.firstName}}</h2>
            <p>
                Student, Institution
            </p>
            <button class="btn btn-outline-primary">Profile</button>
        </div>
    </div>
</div>
