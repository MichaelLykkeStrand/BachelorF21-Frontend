<script context="module">
	import { get,post } from '$lib/utils.js';
	import TaskCard from '../../components/courses/task.svelte';
	import Navbar from '../../components/newNavbar/newNavbar.svelte';

	let userId;
	let modifiable = false;

	export async function load({ page, session, fetch }) {
		const { slug } = page.params;
		if (!session.user) {
			return { redirect: `/login`, status: 302 };
		} else {
			try {
				userId = session.user.userId;
				console.log("Current user: "+userId)
				if(session.user.userData.permissionLevel == 2048){
					modifiable = true;
				}
				let course = await fetch(`/course/${page.params.slug}.json`).then((r) => r.json());
				return {
					props: {
						course: await course
					}
				};
			} catch (err) {
				console.log('Err: ' + err);
			}
		}
		return {};
	}
</script>

<script>
	export let course;

	let task = {};
	let isVRTask = false;
	let expandAddNewTask = false;

	task.name = "";
	task.description = "";
	task.type = "";
	task.courseID = course._id;

	if(userId == undefined){
		location.reload(); 
	}

	if(course.instructors != undefined){
		if (course.instructors.includes(userId)){
			modifiable = true;
		}
	}

	function handleAddTaskButtonClick(event){
		if(isVRTask){
			task.type = "VR"
		} else{
			task.type = "NORMAL"
		}
		let response = post('tasks/task',task);
		let newTask;
		response.then((res)=>{
			newTask = res.result;
			location.reload(); 
		})
	}

	async function expandAddButtonClick(event){
		expandAddNewTask = !expandAddNewTask;
	}

</script>

<body>
	<Navbar />
	<div class="container d-flex">
		<div class="w-100">
			<div>
				<br/>
				<h4 class=" display-5 color:DimGrey;">{course.name}</h4>
			</div>
			<hr/>
			<div>
				<h5 class=" display-6 color:DimGrey;">Tasks</h5>
				{#if modifiable}
				<button on:click={expandAddButtonClick} class="btn btn-secondary dropdown-toggle">New Task</button>
				{#if expandAddNewTask}
				<div class="card">
					<input class="card-header form-control" bind:value="{task.name}" style="font-weight: bold; color:DimGrey;" placeholder="Task name">
					<div class="card-body">
						<blockquote class="blockquote mb-0">
								<div style="font-weight: bold;">Description</div>
								<textarea bind:value="{task.description}" class="w-75 form-control"></textarea>
						</blockquote>
						<div class="form">
							<input class="form-check-input" type=checkbox  bind:checked={isVRTask} id="vr"> <label for="vr">VR Task</label>
						</div>
						<br/>
						<button class="btn btn-success" on:click={handleAddTaskButtonClick} type=submit>
							Add
						</button>
					</div>
				</div>
				{/if}
				<br/>
				{/if}
				{#each course.tasks as taskId, i}
					<br />
					<TaskCard {taskId} {userId} {modifiable}/>
				{:else}
					<p>There are no tasks yet!</p>
				{/each}
				
			</div>
			<br/>
		</div>
	</div>
</body>
