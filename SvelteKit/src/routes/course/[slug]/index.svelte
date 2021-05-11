<script context="module">
	import { get,post } from '$lib/utils.js';
	import TaskCard from '../../components/courses/task.svelte';
	import Navbar from '../../components/newNavbar/newNavbar.svelte';

	let userId;
	let modifiable;




	export async function load({ page, session, fetch }) {
		const { slug } = page.params;
		if (!session.user) {
			return { redirect: `/login`, status: 302 };
		} else {
			try {
				userId = session.user.userId;
				if(session.user.userData.permissionLevel == 2048){
					modifiable = true;
				} else{
					modifiable = false;
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
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
import { patch } from '$lib/api';
	export let course;


	let task = {};
	let isVRTask = false;
	task.name = "";
	task.description = "";
	task.type = "";
	task.courseID = course._id;

	if(course != undefined){
		if (course.instructors == userId){
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
		})
		//TODO goto("#");
	}

</script>

<body>
	<Navbar />
	<div class="container d-flex">
		<div class="w-100">
			<div>
				<h3 style="color:DimGrey;">{course.name}</h3>
			</div>
			<div>
				<h3 style="color:DimGrey;">Tasks</h3>
				{#if {modifiable}}
				<div class="card">
					<input class="card-header" bind:value="{task.name}" style="font-weight: bold; color:DimGrey;">
					<div class="card-body">
						<blockquote class="blockquote mb-0">
								<div style="font-weight: bold;">Description</div>
								<textarea bind:value="{task.description}" class="w-75"></textarea>
						</blockquote>
						<div class="form">
							<input type=checkbox  bind:checked={isVRTask} id="vr"> <label for="vr">VR Task</label>
						</div>
				
						<br/>
						<button on:click={handleAddTaskButtonClick} type=submit>
							Add
						</button>
					</div>
				</div>
				{/if}
				{#each course.tasks as taskId, i}
					<br />
					<TaskCard {taskId} {userId} {modifiable}/>
				{:else}
					<p>You have not been assigned any tasks in this course!</p>
				{/each}
			</div>
		</div>
	</div>
</body>
