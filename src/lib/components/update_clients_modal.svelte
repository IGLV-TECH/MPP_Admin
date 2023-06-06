<script lang="ts">
	import type { Client } from '$lib/models/client';
	import { token } from '$lib/stores/token.store';

	export let client: Client | null;
	export let refetch: () => void;

	let lastName = client?.lastName || '';
	let firstName = client?.firstName || '';
	let phoneNumber = client?.phoneNumber || '';
	let email = client?.email || '';
	let balance = client?.balance || '';
	let password = '';
	let county = client?.address.county || '';
	let city = client?.address.city || '';
	let street = client?.address.street || '';
	let number = client?.address.number || '';
	let ZIPCode = client?.address.zipCode || '';
	let id = client?.id || '';

	const update_values = () => {
		lastName = client?.lastName || '';
		firstName = client?.firstName || '';
		phoneNumber = client?.phoneNumber || '';
		email = client?.email || '';
		balance = client?.balance || '';
		password = '';
		county = client?.address.county || '';
		city = client?.address.city || '';
		street = client?.address.street || '';
		number = client?.address.number || '';
		ZIPCode = client?.address.zipCode || '';
		id = client?.id || '';
	};

	$: {
		client = client;
		update_values();
	}

	// $: {
	// 	console.log(JSON.stringify(client));

	// 	lastName = client?.lastName || '';
	// 	firstName = client?.firstName || '';
	// 	phoneNumber = client?.phoneNumber || '';
	// 	email = client?.email || '';
	// 	balance = client?.balance || '';
	// 	password = '';
	// 	county = client?.address.county || '';
	// 	city = client?.address.city || '';
	// 	street = client?.address.street || '';
	// 	number = client?.address.number || '';
	// 	ZIPCode = client?.address.zipCode || '';
	// 	id = client?.id || '';
	// }

	let loadingUpdate = false;
	let disableUpdate = false;

	let loadingDelete = false;
	let disableDelete = false;

	let checked = false;
	let error = false;

	let my_token = '';

	token.subscribe((value) => {
		if (value) my_token = value;
	});

	const onUpdate = async () => {
		const data = {
			lastName,
			firstName,
			phoneNumber,
			email,
			id,
			balance,
			password,
			address: {
				county,
				city,
				street,
				number,
				ZIPCode
			}
		};

		let res = fetch('http://localhost:8080/clients/' + data.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: my_token
			},
			body: JSON.stringify(data)
		});

		loadingUpdate = true;
		disableUpdate = true;
		disableDelete = true;

		await new Promise((r) => setTimeout(r, 2000));

		res
			.then((res) => {
				if (res.status === 200) {
					checked = false;
					error = false;
					refetch();
				} else {
					error = true;
					console.log(res.json());
				}
			})
			.catch((err) => {
				console.log(err);
				error = true;
			})
			.finally(() => {
				loadingUpdate = false;
				disableUpdate = false;
				disableDelete = false;
			});
	};

	const onDelete = async () => {
		let res = fetch('http://localhost:8080/clients/' + id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: my_token
			}
		});

		loadingDelete = true;
		disableUpdate = true;
		disableDelete = true;

		await new Promise((r) => setTimeout(r, 2000));

		res
			.then((res) => {
				if (res.status === 200) {
					checked = false;
					error = false;
					refetch();
				} else {
					error = true;
					console.log(res.json());
				}
			})
			.catch((err) => {
				console.log(err);
				error = true;
			})
			.finally(() => {
				loadingDelete = false;
				disableUpdate = false;
				disableDelete = false;
			});
	};
</script>

<input bind:checked type="checkbox" id="my-update-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box w-11/12 max-w-5xl space-y-3">
		<h3 class="text-lg font-bold">Update user</h3>

		<input
			type="text"
			placeholder="last name"
			class="input-bordered input max-w-xs"
			bind:value={lastName}
		/>
		<input
			type="text"
			placeholder="first name"
			class="input-bordered input max-w-xs"
			bind:value={firstName}
		/>
		<input
			type="number"
			placeholder="phone number"
			class="input-bordered input w-full max-w-xs"
			bind:value={phoneNumber}
		/>
		<input
			type="email"
			placeholder="email"
			class="input-bordered input w-full max-w-xs"
			bind:value={email}
		/>
		<input
			type="number"
			placeholder="balance"
			class="input-bordered input w-full max-w-xs"
			bind:value={balance}
		/>
		<input
			type="password"
			placeholder="password"
			class="input-bordered input w-full max-w-xs"
			bind:value={password}
		/>
		<p>Address</p>
		<input
			type="text"
			placeholder="county"
			class="input-bordered input w-full max-w-xs"
			bind:value={county}
		/>
		<input
			type="text"
			placeholder="city"
			class="input-bordered input w-full max-w-xs"
			bind:value={city}
		/>
		<input
			type="text"
			placeholder="street"
			class="input-bordered input w-full max-w-xs"
			bind:value={street}
		/>
		<input
			type="number"
			placeholder="number"
			class="input-bordered input w-full max-w-xs"
			bind:value={number}
		/>
		<input
			type="number"
			placeholder="zip code"
			class="input-bordered input w-full max-w-xs"
			bind:value={ZIPCode}
		/>

		{#if error}
			<p class="text-error">Something went wrong. Try again.</p>
		{/if}
		<div class="modal-action">
			<label for="my-update-modal" class="btn-primary btn">Cancel</label>

			<button
				disabled={disableDelete}
				class:loading={loadingDelete}
				class="btn-error btn"
				on:click={onDelete}>Delete</button
			>
			<button disabled={disableUpdate} class:loading={loadingUpdate} class="btn" on:click={onUpdate}
				>Update</button
			>
		</div>
	</div>
</div>
