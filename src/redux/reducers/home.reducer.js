import {
    HOME_FETCHING,
    HOME_SUCCESS,
    HOME_FAILED,
    HOME_SUCCESS_BY_ID,
  } from "../../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    data: null,
  };
  
  const Home = (state = initialState, { type, payload }) => {
    switch (type) {
      case HOME_FETCHING:
        return {
          ...state,
          isFetching: true,
          isError: false,
          result: null,
          data: null,
        };
      case HOME_SUCCESS:
        return {
          ...state,
          isFetching: false,
          isError: false,
          result: payload,
          data: null,
        };
      case HOME_FAILED:
        return {
          ...state,
          isFetching: false,
          isError: true,
          result: payload,
          data: null,
        };
      case HOME_SUCCESS_BY_ID:
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
  
  export default Home;
  