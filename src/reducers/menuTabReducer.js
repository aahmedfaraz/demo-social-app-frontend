import { SET_SCREEN } from "../actions/types";

const initialState = {
  selected: "profile",
};

const menuTabReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_SCREEN:
      return {
        selected: actions.payload,
      };
    default:
      return state;
  }
};

export default menuTabReducer;
