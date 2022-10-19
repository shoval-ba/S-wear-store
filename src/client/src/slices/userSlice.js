import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'myBag',
    initialState,
    reducers: {
        // New user.
        initUser:(state , action)=>{
            state.currentUser = action.payload
        },
    }
});

export const { initUser } = userSlice.actions;

export default userSlice.reducer;
