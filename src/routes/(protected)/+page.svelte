<script lang="ts">
  import { enhance } from '$app/forms';
  import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';
  import * as m from '$lib/paraglide/messages.js';
  import { getAuthState } from '$lib/state/AuthState.svelte';

  const { user } = $derived(getAuthState());
</script>

<StandardPageLayout>
  <section class="prose mb-4">
    <h1>
      {m.hello_world({
        name: user?.name ?? 'unknown user'
      })}
    </h1>
    <h2>{m.choose_lang()}</h2>
    <p>{m.choose_lang_desc()}</p>
    <div class="flex space-x-4">
      <form action="?/english" method="post" use:enhance>
        <button class="btn btn-primary" type="submit"
          >English</button
        >
      </form>

      <form action="?/swedish" method="post" use:enhance>
        <button class="btn btn-primary" type="submit"
          >Svenska</button
        >
      </form>
    </div>
  </section>
</StandardPageLayout>
