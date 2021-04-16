<script>
    import { get } from '$lib/utils.js';
    import { onMount } from 'svelte';
	export let taskId;
	let task = { description: '', type: '' };

	async function getTask() {
		try {
			let resp = await get('courses/task?taskId=' + taskId);
            task = resp;
            task = task;
		} catch (err) {
			console.log(err);
		}
    }
    onMount(async () => {
        getTask().catch(r => {console.log("failed at getting task")});
	});
</script>

<div
	class="rounded-3 border border-dark container-fluid m-2 p-2 bg-dark w-25"
	style="min-width: 200px;"
>
	<div class="row" style="height: 230px;">
		<div class="col-sm ">
			<h5 class="text-white-50">
				{task.name}
			</h5>
			{#if task.type != 'vr'}
				<p>{task.description}</p>
			{/if}
		</div>
	</div>
</div>
