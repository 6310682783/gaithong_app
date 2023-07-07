import {
  REMINDER_FETCHING,
  REMINDER_SUCCESS,
  REMINDER_FAILED,
  server,
  REMINDER_SUCCESS_BY_ID,
} from "../../constants";
import { httpClient } from "../../utils/Api";

export const setReminderFetchingToState = () => ({
  type: REMINDER_FETCHING,
});

export const setReminderSuccessToState = (payload) => ({
  type: REMINDER_SUCCESS,
  payload,
});

export const setReminderFailedToState = (payload) => ({
  type: REMINDER_FAILED,
  payload,
});

export const setReminderSuccessByIDToState = (payload) => ({
  type: REMINDER_SUCCESS_BY_ID,
  payload,
});

export const loadReminderAll = () => {
  return async (dispatch) => {
    dispatch(setReminderFetchingToState());
    try {
      const res = await httpClient.get(
        `${process.env.REACT_APP_API}/${server.REMINDER_URL}/GetAll`
      );
      console.log(res);
      dispatch(setReminderSuccessToState(res.data));
    } catch (e) {
      dispatch(setReminderFailedToState(e.message));
    }
  };
};

export const loadReminderFromNow = () => {
  return async (dispatch) => {
    dispatch(setReminderFetchingToState());
    try {
      const res = await httpClient.get(
        `${process.env.REACT_APP_API}/${server.REMINDER_URL}/GetAllFromNow`
      );
      console.log(res);
      dispatch(setReminderSuccessToState(res.data));
    } catch (e) {
      dispatch(setReminderFailedToState(e.message));
    }
  };
};

export const loadReminderById = (id) => {
  return async (dispatch) => {
    dispatch(setReminderFetchingToState());
    try {
      const res = await httpClient.get(
        `${process.env.REACT_APP_API}/${server.REMINDER_URL}/GetById/${id}`
      );
      dispatch(setReminderSuccessByIDToState(res.data));
    } catch (e) {
      dispatch(setReminderFailedToState(e.message));
    }
  };
};

export const addReminder = (formdata) => {
  console.log(formdata);
  return async (dispatch) => {
    try {
      const res = await httpClient.post(
        `${process.env.REACT_APP_API}/${server.REMINDER_URL}/Add`,
        formdata
      );
      if (res.data.isSuccess) {
        dispatch(setReminderSuccessToState(res.data));
        return res.data;
      } else {
        dispatch(setReminderFailedToState(res.data.message));
      }
    } catch (e) {
      dispatch(setReminderFailedToState(e.message));
    }
  };
};

export const editReminder = (formdata) => {
  console.log(formdata);
  return async (dispatch) => {
    try {
      const res = await httpClient.patch(
        `${process.env.REACT_APP_API}/${server.REMINDER_URL}/Update`,
        formdata
      );
      if (res.data.isSuccess) {
        dispatch(setReminderSuccessToState(res.data));
        return res.data;
      } else {
        dispatch(setReminderFailedToState(res.data.message));
      }
    } catch (e) {
      dispatch(setReminderFailedToState(e.message));
    }
  };
};

export const deleteReminderById = (id) => {
  return async (dispatch) => {
    dispatch(setReminderFetchingToState());
    try {
      const res = await httpClient.delete(
        `${process.env.REACT_APP_API}/${server.REMINDER_URL}/Delete/${id}`
      );
      dispatch(setReminderSuccessByIDToState(res.data));
      return res.data;
    } catch (e) {
      dispatch(setReminderFailedToState(e.message));
    }
  };
};
