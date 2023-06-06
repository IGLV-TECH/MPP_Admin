<script lang="ts">
	import { browser } from '$app/environment';
	import Login from '$lib/components/login.svelte';
	import Nav from '$lib/components/nav.svelte';
	import { token } from '$lib/stores/token.store';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	let loggedIn = false;

	token.subscribe((value) => {
		if (value) {
			loggedIn = true;
		} else {
			loggedIn = false;
		}
	});
</script>

{#if loggedIn}
	<QueryClientProvider client={queryClient}>
		<div class="max-w-8xl mx-auto pt-4 pr-8 pb-8 pl-8">
			<Nav />
			<slot />
		</div>
	</QueryClientProvider>
{:else}
	<div class="max-w-8xl mx-auto pt-4 pr-8 pb-8 pl-8" />
	<Login />
{/if}

<style>
	:global(body) {
		overflow-x: hidden;
	}
</style>
