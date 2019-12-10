import { put } from 'redux-saga/effects';

import { IApiResponse } from 'utils';
import { IAction } from 'store/types';
import { UserActions } from 'store/actions';

/**
 * @param {Object} entity
 * @param {(payload) => promise} constructApi
 * @param {Object} payload
 */
export default function* fetchEntity(entity: Record<string, any>, api: Function, { payload }: IAction) {
  try {
    const response: IApiResponse = yield api();

    if (response.status === 200 || response.status === 201) yield put(entity.success(response.data, payload));
    else if (response.status === 401) yield put({ type: UserActions.logout });
    else {
      yield put(
        entity.failure({
          errors: response.errors,
          message: response.message,
        }),
      );
    }
  } catch (e) {
    yield put(entity.failure({ errorMessage: e.message }));
  }
}
