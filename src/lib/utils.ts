import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * The real `cn`, as of 2026-09-01.
 *
 * This used to be a hand written join, because clsx and tailwind-merge were
 * not installable on this machine. Both are installed now, so the shim is
 * gone and this is the standard implementation every shadcn component
 * expects.
 *
 * Two behaviours arrive with it that the old version did not have:
 *   - the object form, cn('a', { 'b': cond }), now works. The old one turned
 *     an object into the literal class "[object Object]" without erroring.
 *   - conflicting Tailwind utilities are now resolved, so cn('p-2','p-4')
 *     yields 'p-4' instead of both. Existing markup was written knowing the
 *     old function did not de-duplicate; the comment in the previous version
 *     told authors to put the conditional class last, which is exactly what
 *     twMerge does anyway, so that guidance still holds.
 */
export type { ClassValue };

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
