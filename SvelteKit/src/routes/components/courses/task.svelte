<script>
	import { get,patch } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	export let taskId;
	export let userId;
	export let modifiable;

	let hasChanges = false;
	let isVRTask = false;
	let task = {}; //Create empty object
	async function getTask() {
		try {
			let resp = await get('tasks/task?taskId=' + taskId);
			task = resp;
			task = task;
			if(task.type == "VR"){
				isVRTask = true;
			}
		} catch (err) {
			console.log(err);
		}
	}
	onMount(async () => {
		getTask().catch((r) => {
			console.log('failed at getting task');
		});
	});

	async function handleSaveButtonClick(event) {
		if(isVRTask){
			task.type = "VR";
		} else{
			task.type = "NORMAL";
		}
		console.log(task+"Origin: Task.svelte")
		let resp = await patch('tasks/task',task);
	}

	async function handleDeleteButtonClick(event){

	}

	function handleChange(event){
		hasChanges = true;
	}


</script>

{#if modifiable}
<div class="card">
	<input class="card-header" style="font-weight: bold; color:DimGrey;" bind:value={task.name} on:keyup={handleChange}>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
				<div style="font-weight: bold;">Description</div>
				<textarea class="w-75" bind:value={task.description} on:keyup={handleChange}></textarea>
				<p>{task.assignedTo}</p>
		</blockquote>
		<div class="form">
			<input type=checkbox bind:checked={isVRTask} id="vr" on:click={handleChange}> <label for="vr">VR Task</label>
		</div>
		<br/>
		<button on:click={handleSaveButtonClick} disabled={!hasChanges} type=submit>
			Save
		</button>
		<button on:click={handleDeleteButtonClick} type=submit>
			Delete
		</button>
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
		</blockquote>
	</div>
</div>
{/if}


<style>
	textarea { width: 100%; height: 200px; }

</style>
