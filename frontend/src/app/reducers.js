import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { assignSlice } from "./features/assignSlice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    assign: assignSlice.reducer,
});