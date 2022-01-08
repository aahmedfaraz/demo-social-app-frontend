import { SET_SELECTED } from "./types";

export const setSelected = (selectedMenu) => ({
  type: SET_SELECTED,
  payload: selectedMenu,
});
