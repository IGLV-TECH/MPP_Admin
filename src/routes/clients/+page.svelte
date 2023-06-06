<script context="module">
	import ClientsTable from '$lib/components/clients_table.svelte';

	export let page = 1;
</script>

<svelte:head>
	<title>Clients</title>
</svelte:head>

<div class="mt-2">
	<ClientsTable bind:page pageSize={5} />
</div>
