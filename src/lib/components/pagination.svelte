<script lang="ts">
	export let page: number;

	const prevPage = () => {
		if (page > 1) {
			page--;
		}
	};

	const nextPage = () => {
		page++;
	};
</script>

<div class="btn-group">
	<button class="btn" on:click={prevPage}>«</button>
	<button class="btn">Page {page}</button>
	<button class="btn" on:click={nextPage}>»</button>
</div>
