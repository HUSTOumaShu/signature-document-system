import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
    name: 'assign',
    initialState: {
        signees: [],
    },
    reducers: {
        addSignee: (state, action) => {
            state.signees = [...state.signees, {
                key: action.payload.key, 
                name: action.payload.name, 
                email: action.payload.email,}
            ]
        },
        resetSignees: (state) => {
            state.signees = []
        }
    }
})

export const {addSignee, resetSignees} = AssignSlice.actions;
export const selectSignees = (state) => state;
export default AssignSlice.reducer;