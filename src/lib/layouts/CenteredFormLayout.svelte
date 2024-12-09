<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    children
  }: { title: string; children: Snippet } = $props();
</script>

<main
  class="flex h-[calc(100vh-4rem)] items-center justify-center bg-base-200 p-0 md:p-6"
>
  <section
    class="h-full w-full max-w-none rounded-lg bg-white p-4 shadow-lg md:h-auto md:p-8 lg:max-w-xl"
  >
    <h1
      class="text-center text-lg font-semibold lg:text-2xl"
    >
      {title}
    </h1>
    {@render children()}
  </section>
</main>
