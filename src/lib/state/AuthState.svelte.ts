import type { Session, User } from 'better-auth';
import {
  getContext,
  hasContext,
  onDestroy,
  setContext
} from 'svelte';

export class AuthState {
  user = $state<User>();
  session = $state<Session>();

  constructor({
    user,
    session
  }: {
    user: User;
    session: Session;
  }) {
    onDestroy(() => {
      this.user = undefined;
      this.session = undefined;
    });
  }
}

const AUTH_CTX_KEY = Symbol('AUTH_CTX_KEY');

export function setAuthState({
  user,
  session
}: {
  user: User;
  session: Session;
}) {
  return setContext(
    AUTH_CTX_KEY,
    new AuthState({ user, session })
  );
}

export function getAuthState() {
  return getContext<ReturnType<typeof setAuthState>>(
    AUTH_CTX_KEY
  );
}
