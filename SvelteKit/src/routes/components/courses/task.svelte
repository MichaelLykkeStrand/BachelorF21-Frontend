<script>
	import { get,patch,del,post } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import {format} from '$lib/timeFormatter.js';

	export let taskId;
	export let userId;
	export let modifiable;

	let theme = "color:DimGrey";
	let completedTheme = "background-color:DarkSeaGreen"
	let isCompleted = false;
	let hasChanges = false;
	let isVRTask = false;
	let task = {}; //Create empty object

	let expandCompletedBy = false;
	let expandProgress = false;
	$: completedBy = [];

	async function getTask() {
		
		try {
			let resp = await get('tasks/task?taskId=' + taskId);
			
			task = resp;
			task = task;
			await task.completedBy.forEach(async user => {
				console.log("Them: "+user._id+" Me: "+userId);
				if(user._id == userId){
					isCompleted = true;
					theme = completedTheme;
				}
				if(user != undefined){
					let userId = user._id
					let body = {taskId, userId};
					let progress = await post('progress/progress',body);
					completedBy = completedBy
					completedBy.push({firstName: user.firstName, lastName: user.lastName, userId: user._id, timeUsed: progress.timeUsed, timesPaused: progress.timesPaused});
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
		patch('tasks/task',task);
		hasChanges = false;

	}

	async function handleDeleteButtonClick(event){
		console.log("called "+taskId);
		await del('tasks/task?taskId=' + taskId);
		location.reload(); 
	}

	async function handleSubmitTaskButtonClick(event){
		post('tasks/taskComplete',task);
		isCompleted = true;
		theme = completedTheme;

	}

	async function expandCompletedByButtonClick(event){
		expandCompletedBy = !expandCompletedBy;
	}


	async function handleChange(event){
		hasChanges = true;
	}

	async function handlePerformanceButtonClick(userId){
		console.log(userId);
		//let resp = await get('tasks/task?taskId=' + taskId);
		let body = {taskId,userId};
		let resp = await post('progress/progress',body);
		if(resp.progress){
			//TODO
		} else{
			alert("Progress could not be found");
		}
	}


</script>

{#if modifiable}
<div class="card">
	<input class="card-header form-control" style="font-weight: bold; {theme};" bind:value={task.name} on:keyup={handleChange}>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
				<div style="font-weight: bold;">Description</div>
				<textarea class="w-75 form-control" bind:value={task.description} on:keyup={handleChange}></textarea>
		</blockquote>
		<div class="form">
			<input class="form-check-input" type=checkbox bind:checked={isVRTask} id="vr" on:click={handleChange}> <label for="vr">VR Task</label>
		</div>
		<br/>
		<button class="btn btn-success" on:click={handleSaveButtonClick} disabled={!hasChanges} type=submit>
			Save
		</button>
		<button class="btn btn-danger" on:click={handleDeleteButtonClick} type=submit>
			Delete
		</button>
	</div>
	<div class="card">
		<div class="card-body">
			<blockquote class="blockquote mb-0">
				<button on:click={expandCompletedByButtonClick} class="btn btn-secondary dropdown-toggle">Completed by</button>
				{#if expandCompletedBy}
				<br/>
				<ul class="list-group">
					{#each completedBy as {firstName, lastName, userId, timeUsed, timesPaused}}
					<li class="list-group-item d-flex justify-content-between align-items-center">
						{firstName+ " "+lastName}
						{#if isVRTask && timeUsed && timesPaused}
						<div>
							<span class="badge alert-success">{"Time used: "+format(timeUsed)}</span>
							<span class="badge alert-success">{"Times paused: "+timesPaused}</span>
						</div>

						{/if}		
					</li>
					<br/>
					{:else}
					<li class="list-group-item d-flex justify-content-between align-items-center">
						Nobody has completed this task yet!
					</li>
					{/each}
				</ul>
				{/if}
		</blockquote>
		</div>
	</div>
</div>
{:else}
<div class="card">
	<h5 class="card-header" style="font-weight: bold; {theme};">{task.name}</h5>
	<div class="card-body">
		<blockquote class="blockquote mb-0">
			{#if task.type == 'VR'}
			<img style="float: right; width: 40px; height: 40px" src="../VR-512.webp" alt="background image" />
			{/if}
				<div style="font-weight: bold;">Description</div>
				<p>{task.description}</p>
		</blockquote>
		{#if !isCompleted && !isVRTask}
		<br/>
		<button class="btn btn-success" on:click={handleSubmitTaskButtonClick} type=submit>
			Complete
		</button>
		{/if}
	</div>
</div>
{/if}


<style>
	textarea { width: 100%; height: 200px; }
</style>
