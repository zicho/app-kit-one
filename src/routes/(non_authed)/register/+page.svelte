<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';

  let { data }: { data: PageData } = $props();
  const { form, message, errors } = superForm(data.form, {
    resetForm: false
  });
</script>

<form
  method="POST"
  use:enhance
  class="flex flex-col space-y-4 p-4"
>
  <div>
    <label class="mr-4" for="name">Username</label>
    <label class="mr-4" for="name">{$errors.username}</label
    >
    <input
      class="border border-black"
      type="text"
      name="username"
      bind:value={$form.username}
    />
  </div>
  <div>
    <label class="mr-4" for="name">Email</label>
    <label class="mr-4" for="name">{$errors.email}</label>
    <input
      class="border border-black"
      type="email"
      name="email"
      bind:value={$form.email}
    />
  </div>
  <div>
    <label class="mr-4" for="password">Password</label>
    <label class="mr-4" for="name">{$errors.password}</label
    >

    <input
      class="border border-black"
      type="password"
      name="password"
      bind:value={$form.password}
    />
  </div>
  <div>
    <label class="mr-4" for="password"
      >Confirm password</label
    >
    <label class="mr-4" for="name"
      >{$errors.confirm_password}</label
    >

    <input
      class="border border-black"
      type="password"
      name="confirm_password"
      bind:value={$form.confirm_password}
    />
  </div>
  <div><button>Submit</button></div>
  {$message}
</form>
