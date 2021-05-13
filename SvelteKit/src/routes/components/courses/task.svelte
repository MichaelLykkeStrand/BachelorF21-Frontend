<script>
	import { get,patch,del } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	export let taskId;
	export let userId;
	export let modifiable;

	let theme = "color:DimGrey";
	let completedTheme = "background-color:DarkSeaGreen"
	let isCompleted = false;
	let hasChanges = false;
	let isVRTask = false;
	let task = {}; //Create empty object

	$: completedBy = [];

	async function getTask() {
		try {
			let resp = await get('tasks/task?taskId=' + taskId);
			task = resp;
			task = task;
			task.completedBy.forEach(user => {
				console.log("Them: "+user._id+" Me: "+userId);
				if(user._id == userId){
					isCompleted = true;
					theme = completedTheme;
				}
				
				if(user != undefined){
					completedBy = completedBy
					completedBy.push({firstName: user.firstName, lastName: user.lastName});
				}
				
				console.log(completedBy);
			});
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
		hasChanges = false;
		patch('tasks/task',task);

	}

	async function handleDeleteButtonClick(event){
		console.log("called "+taskId);
		await del('tasks/task?taskId=' + taskId);
		location.reload(); 
	}

	async function handleSubmitTaskButtonClick(event){

	}

	function handleChange(event){
		hasChanges = true;
	}


</script>

{#if modifiable}
<div class="card">
	<input class="card-header" style="font-weight: bold; {theme};" bind:value={task.name} on:keyup={handleChange}>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
				<div style="font-weight: bold;">Description</div>
				<textarea class="w-75" bind:value={task.description} on:keyup={handleChange}></textarea>
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
	<div class="card">
		<div class="card-body">
			<blockquote class="blockquote mb-0">
				<div style="font-weight: bold;">Completed by:</div>
					{#each completedBy as {firstName, lastName}}
					<p>{firstName+ " "+lastName}</p>
					{:else}
					<p>Nobody has completed this task yet!</p>
					{/each}

		</blockquote>
		</div>
	</div>
</div>
{:else}
<div class="card">
	<h5 class="card-header" style="font-weight: bold; {theme};">{task.name}</h5>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
			{#if task.type != 'VR'}
				<div style="font-weight: bold;">Description</div>
				<p>{task.description}</p>
			{/if}
		</blockquote>
		{#if !isCompleted}
		<br/>
		<button on:click={handleSubmitTaskButtonClick} type=submit>
			Complete
		</button>
		{/if}
	</div>
</div>
{/if}


<style>
	textarea { width: 100%; height: 200px; }
</style>
