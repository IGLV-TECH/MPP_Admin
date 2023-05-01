<script context="module">
	import Table from '$lib/components/table.svelte';

	export const prerender = true;
</script>

<svelte:head>
	<title>Clients</title>
</svelte:head>

<div class="mt-2">
	<Table start={0} count={5} />
</div>
