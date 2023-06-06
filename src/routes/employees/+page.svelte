<script lang="ts">
	import EmployeesTable from '$lib/components/employees_table.svelte';

	export let page = 1;
</script>

<svelte:head>
	<title>Employees</title>
</svelte:head>

<div class="mt-2">
	<EmployeesTable bind:page pageSize={5} />
</div>
