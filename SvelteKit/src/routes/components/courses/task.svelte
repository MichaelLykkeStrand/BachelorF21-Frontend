<script>
	import { get } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	
	export let taskId;
	export let userId;
	export let modifiable;

	let isAdmin
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

{#if modifiable}
<div class="card">
	<h5 class="card-header" style="font-weight: bold; color:DimGrey;">{task.name}</h5>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
				<div style="font-weight: bold;">Description</div>
				<textarea class="w-75" value={task.description}></textarea>
				<p>{task.assignedTo}</p>
			<p>{task.completedBy}</p>
		</blockquote>
	</div>
</div>
{:else}
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
{/if}


<style>
	textarea { width: 100%; height: 200px; }
</style>
