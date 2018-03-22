import * as types from './action-types';

const initialState = {
  availPaneHeight: null,
  userPosition: null,
  placeDetail: null,
};

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_POSITION:
      return Object.assign({}, ...state, {userPosition: action.userPosition});
    case types.UPDATE_PLACE_DETAIL:
      return Object.assign({}, ...state, {placeDetail: action.placeDetail});
    default:
      return state;
  }
};

export default rootReducer;
