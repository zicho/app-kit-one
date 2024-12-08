import { betterAuth } from 'better-auth';
import { PRIVATE_BETTER_AUTH_SECRET } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { username } from 'better-auth/plugins';
import { db } from '../db/db';

export const auth = betterAuth({
  secret: PRIVATE_BETTER_AUTH_SECRET,
  database: {
    db,
    type: 'postgres'
  },
  advanced: {
    cookiePrefix: 'my-app'
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false // set to true in prod
  },
  plugins: [username()]

  // additional providers go here...
});

export async function checkSession(e: RequestEvent) {
  const session = await auth.api.getSession({
    headers: e.request.headers
  });
  return session;
}

export type TAuthResponse = {
  success: boolean;
  message?: string;
  session?: {
    // if successful, session contains data
    name: string;
    value: string;
    opts: {
      path: string;
      httpOnly: boolean;
      sameSite: 'lax' | 'strict';
      maxAge: number;
    };
  };
};
