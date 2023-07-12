import {
  HOME_FETCHING,
  HOME_SUCCESS,
  HOME_FAILED,
  server,
  HOME_SUCCESS_BY_ID,
} from "../../constants";
import { httpClient } from "../../utils/Api";

export const setHomeFetchingToState = () => ({
  type: HOME_FETCHING,
});

export const setHomeSuccessToState = (payload) => ({
  type: HOME_SUCCESS,
  payload,
});

export const setHomeFailedToState = (payload) => ({
  type: HOME_FAILED,
  payload,
});

export const setHOMESuccessByIDToState = (payload) => ({
  type: HOME_SUCCESS_BY_ID,
  payload,
});

export const loadReminderFromNow = () => {
  return async (dispatch) => {
    dispatch(setHomeFetchingToState());
    try {
      const res = await httpClient.get(
        `${process.env.REACT_APP_API}/${server.HOME_URL}/GetAllToday`
      );
      console.log(res);
      dispatch(setHomeSuccessToState(res.data));
    } catch (e) {
      dispatch(setHomeFailedToState(e.message));
    }
  };
};
