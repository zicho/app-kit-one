<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { i18n } from '$lib/i18n';
  import * as m from '$lib/paraglide/messages.js';
  import {
    languageTag,
    type AvailableLanguageTag
  } from '$lib/paraglide/runtime';

  let { data } = $props();

  function switchToLanguage(
    newLanguage: AvailableLanguageTag
  ) {
    const canonicalPath = i18n.route($page.url.pathname);
    const localisedPath = i18n.resolveRoute(
      canonicalPath,
      newLanguage
    );
    goto(localisedPath);
  }
</script>

<section class="prose mb-4">
  <h1>
    {m.hello_world({
      name: data.user?.name ?? 'unknown user'
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

    {languageTag()}

    <form action="?/swedish" method="post">
      <button class="btn btn-primary" type="submit"
        >Svenska</button
      >
    </form>
  </div>
</section>
