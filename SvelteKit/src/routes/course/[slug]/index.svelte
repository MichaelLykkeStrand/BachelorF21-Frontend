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
						coursee: await course.name
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
	export let coursee;
	console.log("5");
	console.log("Course prop: " + coursee);
</script>

<body>
	<h1>{coursee}</h1>
</body>
