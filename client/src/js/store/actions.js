import * as types from './action-types';

export const updateUserPosition = userPosition => (
  {
    type: types.UPDATE_USER_POSITION,
    userPosition,
  }
);
