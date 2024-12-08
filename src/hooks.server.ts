import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';
import { db } from '$lib/server/db/db';
import { Migrator } from 'kysely';
import { CustomMigrationProvider } from '$lib/server/db/utils';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth, checkSession } from '$lib/server/auth/auth';

// i18n handler
const handleI18n: Handle = i18n.handle();

// Auth handler
const handleAuth: Handle = async ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth });
};

// Migration handler (optional, triggered during startup if necessary)
const handleMigrations: Handle = async ({
  event,
  resolve
}) => {
  const migrator = new Migrator({
    db,
    provider: new CustomMigrationProvider()
  });

  // Uncomment this if you want to run migrations on every request (not recommended in production)
  // const { error, results } = await migrator.migrateToLatest();
  // if (error) {
  //     console.error('Migration failed:', error);
  // }

  return resolve(event);
};

export const handleRoutes: Handle = async ({
  event,
  resolve
}) => {
  // Extract the group name from parentheses
  const match = event.route.id?.match(/\(([^)]+)\)/);
  const group = match ? match[1].split(/[\s/]+/)[0] : null;

  // Check session validity
  const session = await checkSession(event);

  // console.dir('checking session!');
  // if (dev)
  //   console.dir(session ? 'has session' : 'has no session');

  if (group === 'non_authed') {
    if (session) {
      redirect(302, i18n.resolveRoute('/'));
    }
  } else if (group === 'protected') {
    if (!session) {
      redirect(302, i18n.resolveRoute('/login'));
    }
  }

  // Default: Proceed with the request
  return resolve(event);
};

export const handleLang: Handle = async ({
  event,
  resolve
}) => {
  if (event.route.id?.includes('api')) {
    return resolve(event);
  }

  // Retrieve the 'lang' cookie
  // languageTag() always returns "en" here for some reason?
  // work around, get the cookie "manually"
  const lang = event.cookies.get('paraglide_lang');

  if (lang && lang !== 'en') {
    // Check if the URL already starts with the language
    const url = new URL(event.request.url);
    const segments = url.pathname
      .split('/')
      .filter(Boolean); // Remove empty segments

    if (segments[0] !== lang) {
      // Prepend the language to the URL
      url.pathname = `/${lang}${url.pathname}`;

      // Redirect to the new URL
      return Response.redirect(url.toString(), 302);
    }
  }

  // Proceed with the original request
  return resolve(event);
};

// Combine all handlers in sequence
export const handle: Handle = sequence(
  handleAuth,
  handleRoutes,
  // handleLang,
  handleI18n
);
