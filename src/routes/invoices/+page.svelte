<script lang="ts">
	import InvoicesTable from '$lib/components/invoices_table.svelte';

	export let page = 1;
</script>

<svelte:head>
	<title>Invoices</title>
</svelte:head>

<div class="mt-2">
	<InvoicesTable bind:page pageSize={5} />
</div>
