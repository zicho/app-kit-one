<script lang="ts">
  type TextInputProps = {
    id: string;
    name: string;
    label: string;
    value: string;
    errors?: string[];
    password?: boolean;
    classes?: string;
  };

  let {
    id,
    name,
    label,
    value = $bindable(),
    errors = $bindable(),
    password,
    classes
  }: TextInputProps = $props();
</script>

<label class="form-control {classes}">
  <div class="label">
    <label for={id} class="label-text font-semibold"
      >{label}</label
    >
    {#if errors}
      <span class="label-text font-semibold text-error"
        >{errors[0]}</span
      >
    {/if}
  </div>
  <input
    {id}
    {name}
    type={!password ? 'text' : 'password'}
    placeholder={label}
    bind:value
    class="input input-sm input-bordered lg:input-md"
  />
</label>
