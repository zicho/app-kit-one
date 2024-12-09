<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import * as m from '$lib/paraglide/messages.js';
  import TextInput from '$lib/components/TextInput.svelte';
  import Button from '$lib/components/Button.svelte';
  import CenteredFormLayout from '$lib/layouts/CenteredFormLayout.svelte';

  let { data }: { data: PageData } = $props();
  const { form, message, errors } = superForm(data.form, {
    resetForm: false
  });
</script>

<CenteredFormLayout title={m.log_in()}>
  <form
    method="POST"
    use:enhance
    class="flex w-full flex-col space-y-4"
  >
    <TextInput
      label={m.username()}
      id="username-txt-input"
      name="username"
      bind:errors={$errors.username}
      bind:value={$form.username}
    />
    <TextInput
      label={m.password()}
      id="password-txt-input"
      name="password"
      password
      bind:errors={$errors.password}
      bind:value={$form.password}
    />

    <Button
      label={m.log_in()}
      variant="primary"
      type="submit"
    />

    <p class="text-center text-error">
      {$message}
    </p>
  </form>
  <div class="divider py-4">
    <span class="label-text">{m.not_a_member()}</span>
  </div>
  <a
    href="/register"
    class="btn btn-neutral btn-sm w-full lg:btn-md"
    >{m.register()}</a
  >
</CenteredFormLayout>
