<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { form } = superForm(data.form);
</script>

<form method="POST" class="flex flex-col space-y-4 p-4">
	<div>
		<label class="mr-4" for="name">Name</label>
		<input class="border border-black" type="text" name="username" bind:value={$form.username} />
	</div>
	<div>
		<label class="mr-4" for="password">Password</label>
		<input
			class="border border-black"
			type="password"
			name="password"
			bind:value={$form.password}
		/>
	</div>
	<div><button>Submit</button></div>
</form>
