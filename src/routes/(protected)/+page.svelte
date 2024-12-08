<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { getAuthState } from '$lib/state/AuthState.svelte';

  const state = getAuthState();
</script>

<section class="prose mb-4">
  <h1>
    {m.hello_world({
      name: state?.user?.name ?? 'unknown user'
    })}
  </h1>
  <h2>{m.choose_lang()}</h2>
  <p>{m.choose_lang_desc()}</p>
  <div class="flex space-x-4">
    <form action="?/english" method="post">
      <button class="btn btn-primary" type="submit"
        >English</button
      >
    </form>

    <form action="?/swedish" method="post">
      <button class="btn btn-primary" type="submit"
        >Svenska</button
      >
    </form>
  </div>
</section>
