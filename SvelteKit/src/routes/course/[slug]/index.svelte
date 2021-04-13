<script context="module">
	import { get } from '$lib/utils.js';
	import { onMount } from 'svelte';
	export async function load({ page, session }) {
		const { slug } = page.params;
		if (!session.user) {
			return { redirect: `/login`, status: 302 };
		} else {
			let course = await get('/courses/course?courseId=' + slug);
		}

		return {};
	}
</script>
