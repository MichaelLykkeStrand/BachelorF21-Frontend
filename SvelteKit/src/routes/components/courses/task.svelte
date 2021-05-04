<script>
	import { get } from '$lib/utils.js';
	import { onMount } from 'svelte';

	export let taskId;
	export let userId;

	let task = {}; //Create empty object
	async function getTask() {
		try {
			let resp = await get('tasks/task?taskId=' + taskId);
			task = resp;
			task = task;
		} catch (err) {
			console.log(err);
		}
	}
	onMount(async () => {
		getTask().catch((r) => {
			console.log('failed at getting task');
		});
	});
</script>


<div class="card">
	<h5 class="card-header" style="font-weight: bold; color:DimGrey;">{task.name}</h5>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
			{#if task.type != 'VR'}
				<div style="font-weight: bold;">Description</div>
				<p>{task.description}</p>
				<p>{task.assignedTo}</p>
			{/if}
			<p>{task.completedBy}</p>
		</blockquote>
	</div>
</div>
