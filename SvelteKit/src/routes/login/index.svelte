<script>
    import { post } from '$lib/utils.js';
    import { session } from '$app/stores';
    import { goto } from '$app/navigation';
	let user = { email: "", password: "" };
	let inProgress = false;

	async function submit() {
        const res = await post("auth/login", user);
        
        if(res.user){
			if(res.user.permissionLevel == 2048){
				res.user.isAdmin = true;
			} else{
				res.user.isAdmin = false;
			}
            $session.user = res.user;
            goto("/courses");    
        } else{
			goto("/login");
		}
	}
</script>

<style>
	html {
		background-color: #56baed;
	}

	body {
		font-family: "Poppins", sans-serif;
		height: 100vh;
	}

	.icon {
		align-content: center;
	}

	/* STRUCTURE */

	.wrapper {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		min-height: 100%;
		padding: 20px;
	}

	#formContent {
		-webkit-border-radius: 10px 10px 10px 10px;
		border-radius: 10px 10px 10px 10px;
		background: #fff;
		padding: 30px;
		width: 90%;
		max-width: 450px;
		position: relative;
		padding: 20px;
		-webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
		box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
		text-align: center;
	}
</style>

<body>
	<div class="wrapper fadeInDown">
		<div id="formContent">
			<!-- Tabs Titles -->

			<!-- Icon -->
			<div class="icon">
				<img
					src="https://cdn.discordapp.com/attachments/403654574918860811/814428996070539274/vrbt.png"
					class="rounded mx-auto d-block"
					alt="User Icon" />
			</div>

			<!-- Login Form -->

			<form id="loginForm" on:submit|preventDefault={submit}>
				<div class="form-floating mb-3">
					<input
						type="email"
						class="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						bind:value={user.email} />
					<label for="floatingInput">Email address</label>
				</div>
				<div class="form-floating">
					<input
						type="password"
						class="form-control"
						id="floatingPassword"
						placeholder="Password"
						bind:value={user.password} />
					<label for="floatingPassword">Password</label>
				</div>
				<button
					form="loginForm"
					type="submit"
					name="button"
					class="btn btn-primary mt-3">
					Login</button>
			</form>
		</div>
	</div>
</body>