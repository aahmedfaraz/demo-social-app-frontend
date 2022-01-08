import { SET_SELECTED } from "../actions/types";

const initialState = {
  selected: "profile",
};

const menuDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default menuDataReducer;
