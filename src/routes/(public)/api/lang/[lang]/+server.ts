import {
  redirect,
  type RequestHandler
} from '@sveltejs/kit';
import { setLanguageTag } from '$lib/paraglide/runtime';
import { i18n } from '$lib/i18n';

export const POST: RequestHandler = async ({
  url,
  params
}) => {
  const canonicalPath = i18n.route(url.pathname);

  const lang = params.lang === 'en' ? '' : params.lang;
  const redirectUrl = url.searchParams.get('redirect');

  console.log(redirectUrl);

  const localisedPath = i18n.resolveRoute(
    canonicalPath,
    lang as 'en' | 'sv'
  );

  setLanguageTag(lang as 'en' | 'sv');

  // Redirect to the localized path
  redirect(302, i18n.resolveRoute(redirectUrl ?? '/'));
};
