<script lang="ts">
	import { token } from '$lib/stores/token.store';

	export let refetch: () => void;

	let lastName = '';
	let firstName = '';
	let phoneNumber = '';
	let email = '';
	let password = '';
	let county = '';
	let city = '';
	let street = '';
	let number = '';
	let ZIPCode = '';
	let id = '';

	let loading = false;
	let checked = false;
	let error = false;

	let my_token = '';

	token.subscribe((value) => {
		if (value) my_token = value;
	});

	const onClick = async () => {
		const data = {
			lastName,
			firstName,
			phoneNumber,
			email,
			id,
			password,
			address: {
				county,
				city,
				street,
				number,
				ZIPCode
			}
		};

		let res = fetch('http://localhost:8080/employees', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: my_token
			},
			body: JSON.stringify(data)
		});

		loading = true;

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
				loading = false;
			});
	};
</script>

<input bind:checked type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box w-11/12 max-w-5xl space-y-3">
		<h3 class="text-lg font-bold">Create new user</h3>

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
			<label for="my-modal" class="btn-primary btn">Cancel</label>

			<button disabled={loading} class:loading class="btn" on:click={onClick}>Create</button>
		</div>
	</div>
</div>
