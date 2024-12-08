import { auth } from '$lib/server/auth/auth';
import { redirect, type Action } from '@sveltejs/kit';

export const logout: Action = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers // Gives it context to the headers of the original request
  });

  await auth.api.revokeSession({
    headers: request.headers,
    body: {
      token: session!.session.token
    }
  });
};
