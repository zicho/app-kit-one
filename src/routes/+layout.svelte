<script lang="ts">
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';
  import { setAuthState } from '$lib/state/AuthState.svelte';
  let { children, data = $bindable() } = $props();
  import * as m from '$lib/paraglide/messages.js';
  import { languageTag } from '$lib/paraglide/runtime';

  let { user, session } = $derived(data);

  $effect(() => {
    if (!user || !session) return;
    setAuthState({ user, session });
  });
</script>

<ParaglideJS {i18n}>
  <nav class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost text-xl">App</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        {#if session}
          <li>
            <a href="/profile" class="btn btn-ghost"
              >{user?.name}
            </a>
          </li>
          <form method="post" action="/api/logout">
            <input
              type="hidden"
              name="lang"
              value={languageTag()}
            />
            <button type="submit" class="btn btn-ghost"
              >{m.log_out()}</button
            >
          </form>
        {:else}
          <li>
            <a href="/login" class="btn btn-ghost"
              >{m.log_in()}</a
            >
          </li>
          <li>
            <a href="/register" class="btn btn-ghost"
              >{m.register()}</a
            >
          </li>
        {/if}
      </ul>
    </div>
  </nav>
  <main class="p-4 md:p-6">
    {@render children()}
  </main>
</ParaglideJS>
