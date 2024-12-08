import {
  INVALID_USERNAME_OR_PASSWORD,
  UNKNOWN_ERROR,
  USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
  USERNAME_TAKEN
} from '$lib/data/strings/ValidationMessages';

export function getErrorCode(err: unknown): string {
  if (
    typeof err === 'object' &&
    err !== null &&
    'body' in err &&
    typeof (err as any).body === 'object' &&
    'code' in (err as any).body
  ) {
    return getErrorMessageFromCode((err as any).body.code);
  }

  return UNKNOWN_ERROR;
}

function getErrorMessageFromCode(code: string) {
  switch (code) {
    case 'INVALID_USERNAME_OR_PASSWORD':
      return INVALID_USERNAME_OR_PASSWORD;
    case 'USER_WITH_THIS_EMAIL_ALREADY_EXISTS':
      return USER_WITH_THIS_EMAIL_ALREADY_EXISTS;
    case 'FAILED_TO_CREATE_USER':
      return USERNAME_TAKEN;
    default:
      return UNKNOWN_ERROR;
  }
}
