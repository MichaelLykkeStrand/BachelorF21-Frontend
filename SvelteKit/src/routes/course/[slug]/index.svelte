<script context="module">
	import { get } from '$lib/utils.js';
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
	console.log(course.tasks);
</script>

<body>
	<h1>{course.name}</h1>
</body>
