<script context="module">
	import { get } from '$lib/utils.js';
	import TaskCard from '../../components/courses/task.svelte';
	import Navbar from '../../components/newNavbar/newNavbar.svelte';
	let userId;
	export async function load({ page, session, fetch }) {
		const { slug } = page.params;
		if (!session.user) {
			return { redirect: `/login`, status: 302 };
		} else {
			try {
				userId = session.user.userId;
				let course = await fetch(`/course/${page.params.slug}.json`).then((r) => r.json());
				return {	
					props: {
						course: await course
					}
				};
			} catch (err) {
				console.log("Err: " + err);
			}
		}
		return {};
	}
</script>

<script>

	export let course;

	function handleClick() {
			alert('clicked');
		}
</script>

<button on:click={handleClick}>
	Click me
</button>
<br/>

{#if course.instructors == userId}
<h5>{course.instructors}</h5>
<h5>{userId}</h5>
{/if}

<body>
	<Navbar>
	</Navbar>
	<div class="container d-flex">
		<div>
			<div>
				<h3 style="color:DimGrey;">{course.name}</h3>
				
			</div>
			<div>
				<h3 style="color:DimGrey;">Tasks</h3>
				{#each course.tasks as taskId, i}
					<br />
					<TaskCard taskId={taskId} userId={userId}>
					</TaskCard>
	
				{:else}
					<p>You have not been assigned any tasks in this course!</p>
				{/each}
			</div>
		</div>
	</div>
</body>

