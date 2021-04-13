<script context="module">
	import { get } from '$lib/utils.js';
	export async function load({ page, session, fetch }) {
		const { slug } = page.params;
		if (!session.user) {
			return { redirect: `/login`, status: 302 };
		} else {
			try {
				const courses = await fetch(`/course/${page.params.slug}.json`);
				//console.log(res);
				return {
					props: {
						courses
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
	export let courses;
</script>

<body>
	<h1>{courses}</h1>
</body>
