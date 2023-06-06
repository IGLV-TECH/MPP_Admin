<script lang="ts">
	import { token } from '$lib/stores/token.store';

	let loading: boolean = false;
	let checked: boolean = true;
	let error: boolean = false;

	let email: string = '';
	let password: string = '';

	const onPress = async () => {
		let res = fetch('http://localhost:8080/admins/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		loading = true;

		await new Promise((r) => setTimeout(r, 2000));

		res
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				if (data.token) {
					token.set(data.token);
					checked = false;
					error = false;
				} else {
					error = true;
					console.log(data);
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

<input bind:checked type="checkbox" id="my-modal-6" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
	<div class="modal-box space-y-3">
		<h3 class="text-xl font-bold">Login</h3>
		<p>Insert your credentials to access the admin panel.</p>
		<input
			type="text"
			placeholder="email"
			bind:value={email}
			class="input-bordered input w-full max-w-xs"
		/>
		<input
			type="password"
			placeholder="password"
			bind:value={password}
			class="input-bordered input w-full max-w-xs"
		/>

		{#if error}
			<p class="text-error">Invalid credentials.</p>
		{/if}
		<div class="modal-action">
			<button disabled={loading} class="btn" on:click={onPress} class:loading>Log in</button>
		</div>
	</div>
</div>
