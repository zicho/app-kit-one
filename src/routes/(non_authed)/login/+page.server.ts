import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerUserSchema } from '$lib/validation/schemas/registerUserSchema.js';
import { signInUsername, signUpEmail } from '$lib/server/auth/emailPasswordAuthUtils.js';
import { loginUserSchema } from '$lib/validation/schemas/loginUserSchema.js';

export const load = async () => {
	const form = await superValidate(zod(loginUserSchema));

	// Always return { form } in load functions
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(loginUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = form.data;
		const authResponse = await signInUsername({ user });

		if (authResponse.success) {
			const { session } = authResponse;
			cookies.set(session!.name, session!.value, session!.opts);
			redirect(302, '/');
		} else {
			error(403);
		}
	}
};
