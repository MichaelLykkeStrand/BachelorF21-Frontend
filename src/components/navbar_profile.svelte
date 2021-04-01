<script>
    import axios from "axios";


    async function submit() {
		try {
			//inProgress = true;
			console.log(user.email + " " + user.password);
			const response = await axios.post(
				"http://localhost:3600/auth"
			);
			//inProgress = false;
			//error = null;
		} catch (err) {
			//error = err.response.data.message;
			console.log("i failed :)" + err);
			inProgress = false;
		}
	}
</script>

<div class="h-auto d-inline-block">
    <div class="row ">
        <div class="col-md-2 col-xs-2 ">
            <img src="http://placehold.it/150X150" alt="http://placehold.it/150X150" class="img-fluid rounded-circle " style="max-width: 50px;" />
        </div>
        <div class="col align-self-center vertical-center">
            <h4 class="font-weight-light">USERNAME</h4>
        </div>
    </div>
</div>