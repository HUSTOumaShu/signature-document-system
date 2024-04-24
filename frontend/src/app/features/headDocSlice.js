import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    message: '',
}

export const headDocSlice = createSlice({
    name: 'head',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setHead: (state, action) => {
            state.title = action.payload.title
            state.message = action.payload.message
        }
    }
})

export const { setTitle, setMessage, setHead } = headDocSlice.actions