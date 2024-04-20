import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signees: [],
}

export const assignSlice = createSlice({
    name: 'assign',
    initialState,
    reducers: {
        addSignee: (state, action) => {
            console.log('addSignee', action.payload)
            state.signees = [...state.signees, {
                key: action.payload.key,
                name: action.payload.name,
                email: action.payload.email,
            }]
        },
        resetSignee: (state, action) => {
            console.log('resetSignee')
            state.signees = []
        }
    }
})
export const { addSignee, resetSignee } = assignSlice.actions