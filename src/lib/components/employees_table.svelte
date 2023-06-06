<script lang="ts">
	import type { Employee } from '$lib/models/employee';
	import { token } from '$lib/stores/token.store';
	import CreateEmployeeModal from './create_employee_modal.svelte';
	import Pagination from './pagination.svelte';
	import UpdateEmployeesModal from './update_employees_modal.svelte';

	export let page: number;
	export let pageSize = 5;

	let employees: Employee[] = [];

	let my_token = '';

	token.subscribe((value) => {
		if (value) my_token = value;
	});

	let selected: Employee | null = null;

	const columns = ['Name', 'Phone', 'Email', 'Address'];

	const fetchEmployees = async () => {
		try {
			const res = await fetch(
				`http://localhost:8080/employees?start=${(page - 1) * pageSize}&count=${pageSize}`,
				{
					method: 'GET',
					headers: {
						Authorization: my_token
					}
				}
			);
			if (!res.ok) {
				throw new Error('Error fetching employees.');
			}
			const data = await res.json();

			employees = data;
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
	<div class="space-x-3">
		<!-- The button to open modal -->
		<label for="my-modal" class="btn">Add new employee</label>
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
			{#each employees as employee}
				<tr>
					<th>
						<label
							for="my-update-modal"
							class="btn"
							on:click={() => {
								console.log('something');
								selected = employee;
							}}>Edit</label
						>
					</th>
					<td>
						{employee.firstName + ' ' + employee.lastName}
					</td>
					<td>
						{employee.phoneNumber}
					</td>
					<td>
						{employee.email}
					</td>
					<td>
						<div>
							<div class="font-bold">{employee.address.county}</div>
							<div class="text-sm opacity-50">
								{employee.address.city +
									', ' +
									employee.address.street +
									' ' +
									employee.address.number +
									', ' +
									employee.address.zipCode}
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
<CreateEmployeeModal refetch={fetchEmployees} />
<UpdateEmployeesModal bind:client={selected} refetch={fetchEmployees} />
