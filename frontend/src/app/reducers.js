import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { assignSlice } from "./features/assignSlice";
import { headDocSlice } from "./features/headDocSlice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    assign: assignSlice.reducer,
    head: headDocSlice.reducer,
});