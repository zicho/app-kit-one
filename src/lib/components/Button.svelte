<script lang="ts">
  type ButtonProps = {
    variant?:
      | 'neutral'
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'ghost'
      | 'link';
    type?: 'button' | 'submit';
    label: string;
    classes?: string;
  };

  let {
    variant = 'neutral',
    type = 'button',
    label,
    classes
  }: ButtonProps = $props();
</script>

<button
  class="btn btn-{variant} {classes} btn-sm lg:btn-md"
  {type}>{label}</button
>
