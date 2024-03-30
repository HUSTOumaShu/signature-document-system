import { createSlice } from "@reduxjs/toolkit";

export const ViewDocumentSlice = createSlice({
    name: 'viewDocument',
    initialState: {
        docToView: null,
    },
    reducers: {
        setDocToView: (state, action) => {
            state.docToView = action.payload;
        },
        resetDocToView: (state) => {
            state.docToView = null;
        }
    },
})

export const {setDocToView, resetDocToView} = ViewDocumentSlice.actions;
export const selectDocToView = state => state.viewDocument.docToView;
export default ViewDocumentSlice.reducer;