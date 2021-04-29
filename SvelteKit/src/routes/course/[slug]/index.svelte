<script context="module">
	import { get } from '$lib/utils.js';
	import TaskCard from '../../components/courses/task.svelte'
	export async function load({ page, session, fetch }) {
		const { slug } = page.params;
		if (!session.user) {
			return { redirect: `/login`, status: 302 };
		} else {
			try {
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
</script>

<div class="container d-flex">
    <div>
        {#each course.tasks as taskId, i}
			<br />
            <TaskCard taskId={taskId}>
            </TaskCard>
        {/each}

    </div>
</div>
