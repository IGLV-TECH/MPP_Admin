<script lang="ts">
	import type { Invoice } from '$lib/models/invoice';
	import { token } from '$lib/stores/token.store';
	import Pagination from './pagination.svelte';

	export let page: number;
	export let pageSize = 5;

	let invoices: Invoice[] = [];

	let my_token = '';

	token.subscribe((value) => {
		if (value) my_token = value;
	});

	const columns = ['Category', 'Payment', 'Penalty', 'Date'];

	const fetchEmployees = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/invoices?start=${(page - 1) * pageSize}&count=${pageSize}`,
				{
					method: 'GET',
					headers: {
						Authorization: my_token
					}
				}
			);
			if (!res.ok) {
				throw new Error('Error fetching invoices.');
			}
			const data = await res.json();

			invoices = data;
		} catch (error) {
			console.error(error);
		}
	};

	$: {
		page = page;
		fetchEmployees();
	}
</script>

<div class="w-full space-y-3 overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th />
				{#each columns as column}
					<th>{column}</th>
				{/each}
				<th />
			</tr>
		</thead>
		<tbody>
			{#each invoices as invoice}
				<tr>
					<td>
						{invoice.category}
					</td>
					<td>
						{invoice.payment}
					</td>
					<td>
						{invoice.penalty}
					</td>
					<td>
						{invoice.date}
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th />
				{#each columns as column}
					<th>{column}</th>
				{/each}
				<th />
			</tr>
		</tfoot>
	</table>
	<Pagination bind:page />
</div>
