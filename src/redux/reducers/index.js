import { combineReducers } from "redux";
import ReminderReducer from "./reminder.reducer";
import HomeReducer from "./home.reducer";

const rootReducer = combineReducers({
  reminderReducer: ReminderReducer,
  homeReducer: HomeReducer,
});

export default rootReducer;
