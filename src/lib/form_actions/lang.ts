import type { Action } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { i18n } from '$lib/i18n'; // Ensure the correct import path for `i18n`
import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

function changeLanguage(
  lang: AvailableLanguageTag
): Action {
  return async ({ cookies, url }) => {
    // Get the canonical path and resolve the localized path
    const canonicalPath = i18n.route(url.pathname);
    const localisedPath = i18n.resolveRoute(
      canonicalPath,
      lang
    );

    // Set the language cookie
    console.log('changing language');
    cookies.set('paraglide_lang', lang, { path: '/' });

    // Redirect to the localized path
    throw redirect(302, localisedPath);
  };
}

// Define specific language actions
export const swedish: Action = changeLanguage('sv');
export const english: Action = changeLanguage('en');
