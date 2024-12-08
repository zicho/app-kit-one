import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth/auth';

export const POST: RequestHandler = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers // Gives it context to the headers of the original request
  });

  const lang = (await request.formData()).get('lang');

  if (!session) redirect(302, '/login');

  await auth.api.revokeSession({
    headers: request.headers,
    body: {
      token: session!.session.token
    }
  });

  if (lang === 'en') redirect(303, `/login`);
  redirect(303, `/${lang}/login`);
};
