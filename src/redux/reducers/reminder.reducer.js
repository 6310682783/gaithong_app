import {
  REMINDER_FETCHING,
  REMINDER_SUCCESS,
  REMINDER_FAILED,
  REMINDER_SUCCESS_BY_ID,
} from "../../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  data: null,
};

const Reminder = (state = initialState, { type, payload }) => {
  switch (type) {
    case REMINDER_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: null,
        data: null,
      };
    case REMINDER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        data: null,
      };
    case REMINDER_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
        result: payload,
        data: null,
      };
    case REMINDER_SUCCESS_BY_ID:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: null,
        data: payload,
      };
    default:
      return state;
  }
};

export default Reminder;
