import type { Session, User } from 'better-auth';
import { getContext, setContext } from 'svelte';

type AuthStateData = {
  readonly user: User | undefined;
  readonly session: Session | undefined;
};

export class AuthState {
  user = $state<User>();
  session = $state<Session>();

  get currentUser() {
    return this.user;
  }

  constructor({
    user,
    session
  }: {
    user: User | undefined;
    session: Session | undefined;
  }) {
    this.user = user;
    this.session = session;
  }
}

const AUTH_CTX_KEY = Symbol('AUTH_CTX_KEY');

export function setAuthState(initialData: AuthStateData) {
  const authState = $state(initialData);
  setContext(AUTH_CTX_KEY, initialData);
  return authState;
}

export function getAuthState() {
  return getContext<AuthStateData>(AUTH_CTX_KEY);
}
