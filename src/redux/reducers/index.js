import { combineReducers } from "redux";
import ReminderReducer from "./reminder.reducer"

const rootReducer = combineReducers({
    reminderReducer: ReminderReducer,
})

export default rootReducer;