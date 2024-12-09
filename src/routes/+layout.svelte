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
  <Navbar />

  {@render children()}
</ParaglideJS>
