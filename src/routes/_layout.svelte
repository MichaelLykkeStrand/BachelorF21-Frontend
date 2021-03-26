<script>
	import Nav from '../components/navbar.svelte';
	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	body {
  		padding-top: 60px;
	}
	@media (max-width: 979px) {
  	body {
    	padding-top: 0px;
  	}
}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>