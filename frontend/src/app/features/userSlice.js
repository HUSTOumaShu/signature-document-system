import {createSlice} from '@reduxjs/toolkit';

const initiateState = {
    user: null,
    isLoading: true,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initiateState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logOut: (state) => {
            state.user = null
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { loginUser, logOut, setLoading } = userSlice.actions