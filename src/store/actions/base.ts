import { Action } from 'redux';

export enum Actions {
  request,
  success,
  failure,
  logout,
  authenticate,
  signup,
  login,
}

/**
 * Generates object with keys
 * @param base object name
 * @param otherActions Extra keys
 */
export function createRequestType(base: string, ...otherActions: Actions[]) {
  return [Actions.request, Actions.success, Actions.failure, ...otherActions].reduce(
    // @ts-ignore
    (acc: Action<Actions>, type: string) => {
      // @ts-ignore
      acc[type] = `${base}_${type}`;
      return acc;
      // @ts-ignore
    },
    {},
  );
}

export function action(type: string | number, payload = {}) {
  return { type, payload };
}
