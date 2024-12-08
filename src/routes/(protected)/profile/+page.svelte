<script lang="ts">
  import type { PageData } from './$types';
  import * as m from '$lib/paraglide/messages.js';

  let { data }: { data: PageData } = $props();
</script>

<section class="prose">
  <h1>{m.profile()}</h1>
</section>
