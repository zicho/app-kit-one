<script>
	import { enhance } from '$app/forms';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<form use:enhance method="post">
	<input type="text" />
	<input type="password" />
	<button type="submit">Login</button>
</form>
