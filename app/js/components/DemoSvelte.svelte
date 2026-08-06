<svelte:options customElement="demo-svelte" />

<script>
	let { name } = $props();
	let count = $state(0);
</script>

<div>
	<p>Compteur créé avec {name} :</p>
	<button onclick={() => count++}>
		{count}
	</button>
</div>

<style>
	p {
		color: darkred;
		text-align: center;
	}
</style>
