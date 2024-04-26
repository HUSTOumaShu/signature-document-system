import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docToSign: null,
    docToView: null,
}

export const docSlice = createSlice({
    name: 'doc',
    initialState,
    reducers: {
        setDocToSign: (state, action) => {
            state.docToSign = action.payload
        },
        resetDocToSign: (state) => {
            state.docToSign = null
        },
        setDocToView: (state, action) => {
            state.docToView = action.payload
        },
        resetDocToView: (state) => {
            state.docToView = null
        }
    }
})

export const { setDocToSign, resetDocToSign, setDocToView, resetDocToView } = docSlice.actions