<script context="module">
	import { get } from '$lib/utils.js';
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
	export let course;

	function handleClick(event) {
		alert('clicked' + event.target);
	}
</script>

<button on:click={handleClick}> Click me </button>
<br />

{#if course.instructors == userId}
	<h5>{course.instructors}</h5>
	<h5>{userId}</h5>
{/if}

<body>
	<Navbar />
	<div class="container d-flex">
		<div class="w-100">
			<div>
				<h3 style="color:DimGrey;">{course.name}</h3>
			</div>
			<div>
				<h3 style="color:DimGrey;">Tasks</h3>
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
