<script>
    import { post } from '$lib/utils.js';
    import { session } from '$app/stores';
    import { goto } from '$app/navigation';
	let user = { email: "", password: "" };
	let inProgress = false;

	async function submit() {
        const res = await post("auth/login", user);
        
        if(res.user){
            $session.user = res.user;
            goto("/courses");    
        } else{
			goto("/error");
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

<svelte:head>
	<script
		src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js"
		integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi"
		crossorigin="anonymous">
	</script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js"
		integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG"
		crossorigin="anonymous">
	</script>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
		crossorigin="anonymous" />
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
		crossorigin="anonymous">
	</script>
	<meta name="referrer" content="no-referrer-when-downgrade" />
</svelte:head>

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