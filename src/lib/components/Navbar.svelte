<script lang="ts">
  import { getAuthState } from '$lib/state/AuthState.svelte';
  import * as m from '$lib/paraglide/messages.js';

  const { session, user } = $derived.by(getAuthState);
</script>

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
