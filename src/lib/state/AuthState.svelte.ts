import type { Session, User } from 'better-auth';
import { getContext, onDestroy, setContext } from 'svelte';

type AuthStateData = {
  user: User | undefined;
  session: Session | undefined;
};

export class AuthState {
  user = $state<User>();
  session = $state<Session>();

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
  const authState = new AuthState(initialData);
  setContext<AuthStateData>(AUTH_CTX_KEY, authState);
  return authState;
}

export function getAuthState() {
  const data = getContext<AuthStateData>(AUTH_CTX_KEY);
  return data;
}
