<script>
	import Nav from '../components/navbar.svelte';
	export let segment;
</script>



<Nav {segment}/>

<main>
	<slot></slot>
</main>