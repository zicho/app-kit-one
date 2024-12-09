<script lang="ts">
  import { i18n } from '$lib/i18n';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import '../app.css';
  import { setAuthState } from '$lib/state/AuthState.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  let { children, data } = $props();

  setAuthState({
    get user() {
      return data.user;
    },
    get session() {
      return data.session;
    }
  });
</script>

<ParaglideJS {i18n}>
  <nav class="navbar bg-neutral text-neutral-content">
    <Navbar />
  </nav>
  <main class="p-4 md:p-6">
    {@render children()}
  </main>
</ParaglideJS>
