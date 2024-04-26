import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/userSlice";
import { assignSlice } from "./features/assignSlice";
import { headDocSlice } from "./features/headDocSlice";
import { docSlice } from "./features/docSlice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    assign: assignSlice.reducer,
    head: headDocSlice.reducer,
    doc: docSlice.reducer,
});