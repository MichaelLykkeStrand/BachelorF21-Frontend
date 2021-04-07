<script>
	import Nav from '../components/navbar.svelte';
	import { stores } from "@sapper/app";

	let { page } = stores();

	export let segment;
	export let currentSession;
	const { session } = stores();
	$session = currentSession;

</script>

<script context="module">
    export function preload(page, session) {
		let currentSession = session;
		return { currentSession };
    }
</script>

{#if $page.path != "/"} <!-- If your route file is /src/routes/login.svelte -->
  <Nav {segment}/>
{/if}

<main>
	<slot></slot>
</main>