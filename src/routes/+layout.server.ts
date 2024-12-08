import { checkSession } from '$lib/server/auth/auth';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const session = await checkSession(event);

	event.depends('paraglide:lang');

	return {
		session,
		user: session?.user
	};
}) satisfies LayoutServerLoad;
