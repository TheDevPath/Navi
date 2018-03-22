import * as types from './action-types';

export const updateUserPosition = userPosition => (
  {
    type: types.UPDATE_USER_POSITION,
    userPosition,
  }
);

export const updatePlaceDetail =   placeDetail => (
  {
    type: types.UPDATE_PLACE_DETAIL,
      placeDetail,
  }
);
