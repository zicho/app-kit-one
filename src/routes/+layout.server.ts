import { checkSession } from '$lib/server/auth/auth';
import type { Actions } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { logout } from '$lib/form_actions/logout';

export const load = (async (event) => {
  const session = await checkSession(event);

  return {
    session: session?.session,
    user: session?.user
  };
}) satisfies LayoutServerLoad;
