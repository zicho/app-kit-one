import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { i18n } from '$lib/i18n';
import { db } from '$lib/server/db/db';
import { Migrator } from 'kysely';
import { CustomMigrationProvider } from '$lib/server/db/utils';

import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/server/auth/auth';

// i18n handler
const handleI18n: Handle = i18n.handle();

// Auth handler
const handleAuth: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth });
};

// Migration handler (optional, triggered during startup if necessary)
const handleMigrations: Handle = async ({ event, resolve }) => {
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

// Combine all handlers in sequence
// export const handle: Handle = sequence(handleAuth, handleI18n);

export async function handle({ event, resolve }) {
	return svelteKitHandler({ event, resolve, auth });
}
