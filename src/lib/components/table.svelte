<script lang="ts">
	import { clients } from '$lib/models/client';

	export let start: number;
	export let count: number;

	const columns = ['Name', 'Phone', 'Email', 'Balance', 'Address'];
</script>

<div class="w-full overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th>
					<label>
						<input type="checkbox" class="checkbox" />
					</label>
				</th>
				{#each columns as column}
					<th>{column}</th>
				{/each}
				<th />
			</tr>
		</thead>
		<tbody>
			{#each clients.slice(start, start + count) as client}
				<tr>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					<td>
						{client.client.firstName + ' ' + client.client.lastName}
					</td>
					<td>
						{client.client.phone}
					</td>
					<td>
						{client.client.email}
					</td>
					<td>
						{client.client.balance}
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
</div>
