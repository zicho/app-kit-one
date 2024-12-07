import { auth } from '$lib/server/auth/auth'; // Your authentication module
import { signInEmail } from '$lib/server/auth/emailPasswordAuthUtils.js';
import { error, type Actions } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
	const user = {
		email: 'user', // Example user info
		password: 'safe_password'
	};

	return;

	const authResponse = await signInEmail({ user });

	if (authResponse.success) {
		const { session } = authResponse;
		cookies.set(session!.name, session!.value, session!.opts);
	} else {
		error(403);
	}
};

export const actions = {
	default: async (event) => {
		console.log('le poo');
		console.dir(await auth.api.getSession({ headers: event.request.headers }));
	}
} satisfies Actions;
