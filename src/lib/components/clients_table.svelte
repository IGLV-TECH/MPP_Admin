<script lang="ts">
	import type { Client } from '$lib/models/client';
	import { token } from '$lib/stores/token.store';
	import CreateClientsModal from './create_clients_modal.svelte';
	import Pagination from './pagination.svelte';
	import UpdateClientsModal from './update_clients_modal.svelte';

	export let page: number;
	export let pageSize = 5;

	let clients: Client[] = [];

	let my_token = '';

	token.subscribe((value) => {
		if (value) my_token = value;
	});

	let selected: Client | null = null;

	const columns = ['Name', 'Phone', 'Email', 'Balance', 'Address'];

	const fetchClients = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/clients?start=${(page - 1) * pageSize}&count=${pageSize}`,
				{
					method: 'GET',
					headers: {
						Authorization: `${my_token}`
					}
				}
			);
			if (!res.ok) {
				throw new Error('Error fetching clients');
			}
			const data = await res.json();

			clients = data;
		} catch (error) {
			console.error(error);
		}
	};

	$: {
		page = page;
		fetchClients();
	}
</script>

<div class="w-full space-y-3 overflow-x-auto">
	<div class="space-x-3">
		<!-- The button to open modal -->
		<label for="my-modal" class="btn">Add new client</label>
	</div>
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th> Selected </th>
				{#each columns as column}
					<th>{column}</th>
				{/each}
				<th />
			</tr>
		</thead>
		<tbody>
			{#each clients as client}
				<tr>
					<th>
						<label
							for="my-update-modal"
							class="btn"
							on:click={() => {
								console.log('something');
								selected = client;
							}}>Edit</label
						>
					</th>
					<td>
						{client.firstName + ' ' + client.lastName}
					</td>
					<td>
						{client.phoneNumber}
					</td>
					<td>
						{client.email}
					</td>
					<td>
						{client.balance}
					</td>
					<td>
						<div>
							<div class="font-bold">{client.address.county}</div>
							<div class="text-sm opacity-50">
								{client.address.city +
									', ' +
									client.address.street +
									' ' +
									client.address.number +
									', ' +
									client.address.zipCode}
							</div>
						</div>
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

<!-- Put this part before </body> tag -->
<CreateClientsModal refetch={fetchClients} />
<UpdateClientsModal bind:client={selected} refetch={fetchClients} />
