<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';
	import * as m from '$lib/paraglide/messages.js';
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

	let { data } = $props();

	function switchToLanguage(newLanguage: AvailableLanguageTag) {
		const canonicalPath = i18n.route($page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	}
</script>

<h1>{m.hello_world({ name: data.user?.name ?? 'unknown user' })}</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div>
	<button onclick={() => switchToLanguage('en')}>en</button>
	<button onclick={() => switchToLanguage('sv')}>sv</button>
</div>

<form action="?/swedish" method="post">
	<button type="submit">Svenska</button>
</form>

<form action="?/english" method="post">
	<button type="submit">English</button>
</form>
