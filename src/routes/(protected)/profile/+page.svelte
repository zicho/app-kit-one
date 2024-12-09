<script lang="ts">
  import type { PageData } from './$types';
  import * as m from '$lib/paraglide/messages.js';
  import StandardPageLayout from '$lib/layouts/StandardPageLayout.svelte';

  let { data }: { data: PageData } = $props();
</script>

<StandardPageLayout>
  <section class="prose">
    <h1>{m.profile()}</h1>
  </section>
</StandardPageLayout>
