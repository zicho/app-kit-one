import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth/auth';
import { i18n } from '$lib/i18n.js';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({
  request,
  cookies
}) => {
  const session = await auth.api.getSession({
    headers: request.headers // Gives it context to the headers of the original request
  });

  if (!session) redirect(302, i18n.resolveRoute('/login'));

  await auth.api.revokeSession({
    headers: request.headers,
    body: {
      token: session!.session.token
    }
  });

  const lang = cookies.get('paraglide_lang');

  console.log('lang', lang);

  // if (lang == 'en') {
  //   redirect(302, '/login');
  // }

  redirect(302, i18n.resolveRoute(`/login`));
};
