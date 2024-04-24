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
        removeSignee: (state, action) => {
            console.log('removeSignee', action.payload)
            state.signees = state.signees.filter(signee => signee.key !== action.payload)
        },
        resetSignee: (state, action) => {
            console.log('resetSignee')
            state.signees = []
        }
    }
})
export const { addSignee, removeSignee, resetSignee } = assignSlice.actions