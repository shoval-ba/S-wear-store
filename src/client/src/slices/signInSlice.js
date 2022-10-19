import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signIn: false,
}

export const signInSlice = createSlice({
    name: 'myBag',
    initialState,
    reducers: {
        changeSignIn: (state, action) => {
            state.signIn = action.payload;
        },
    }
});

export const { changeSignIn } = signInSlice.actions;

export default signInSlice.reducer;
