/**
 * Project: Kadoorie Livewire Components
 * File: httpErrorStatus.ts
 * User: dappelbe
 * Created: 2026-07-04
 * Last updated by: dappelbe
 * Last updated on: 2026-07-04
 * Version: 0.1.0
 */

/**
 * TS mirror of the PHP HttpErrorStatus enum: title/description copy for the
 * known statuses (401/403/404/405/406/412/500/501/502) plus a generic fallback
 * for any other status. Kept verbatim so the React error page matches the Blade
 * twin.
 */

export interface HttpErrorCopy {
  title: string;
  description: string;
}

const errorCopy: Record<number, HttpErrorCopy> = {
  401: { title: 'Authentication required', description: 'You need to sign in to view this page.' },
  403: { title: 'Access denied', description: 'You do not have permission to access this page.' },
  404: { title: 'Page not found', description: 'We could not find the page you were looking for.' },
  405: { title: 'Method not allowed', description: 'That action is not allowed on this resource.' },
  406: {
    title: 'Not acceptable',
    description: 'This resource cannot produce a response matching your request.',
  },
  412: {
    title: 'Precondition failed',
    description: 'A precondition for this request was not met.',
  },
  500: {
    title: 'Something went wrong',
    description: 'Something went wrong on our end. Please try again later.',
  },
  501: { title: 'Not implemented', description: 'This feature is not available yet.' },
  502: {
    title: 'Bad gateway',
    description: 'We received an invalid response from an upstream server.',
  },
};

const genericError: HttpErrorCopy = {
  title: 'Unexpected error',
  description: 'Something went wrong. Please try again later.',
};

/**
 * Resolve the title/description for an HTTP status, falling back to the generic
 * copy for any status not covered by the mirror.
 */
export function httpErrorCopy(status: number): HttpErrorCopy {
  return errorCopy[status] ?? genericError;
}
