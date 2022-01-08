import { SET_SCREEN } from "./types";

export const setScreen = (screen) => ({
  type: SET_SCREEN,
  payload: screen,
});
