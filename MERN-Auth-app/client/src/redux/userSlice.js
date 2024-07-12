import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload
        },
    },
})

export const { addToken } = authSlice.actions

export default authSlice.reducer