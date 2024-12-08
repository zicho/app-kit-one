import { fail, redirect } from '@sveltejs/kit';
import {
  message,
  superValidate
} from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { signInUsername } from '$lib/server/auth/emailPasswordAuthUtils.js';
import { loginUserSchema } from '$lib/validation/schemas/loginUserSchema.js';
import { logout } from '$lib/form_actions/logout.js';
import { i18n } from '$lib/i18n';

export const load = async () => {
  const form = await superValidate(zod(loginUserSchema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(
      request,
      zod(loginUserSchema)
    );

    if (!form.valid) {
      return fail(400, { form });
    }

    const user = form.data;
    const authResponse = await signInUsername({ user });

    if (authResponse.success) {
      const { session } = authResponse;
      cookies.set(
        session!.name,
        session!.value,
        session!.opts
      );
      redirect(302, i18n.resolveRoute('/'));
    } else {
      return message(form, authResponse.message);
    }
  }
};
