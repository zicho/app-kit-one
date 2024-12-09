import type { Session, User } from 'better-auth';
import { getContext, setContext } from 'svelte';

type AuthStateData = {
  readonly user: User | undefined;
  readonly session: Session | undefined;
};

const AUTH_CTX_KEY = Symbol('AUTH_CTX_KEY');

export function setAuthState(initialData: AuthStateData) {
  return setContext(AUTH_CTX_KEY, initialData);
}

export function getAuthState() {
  return getContext<AuthStateData>(AUTH_CTX_KEY);
}
