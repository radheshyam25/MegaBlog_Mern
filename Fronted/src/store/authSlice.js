import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        updatetoken: (state,action)=>{
            state.userData.accesstoken=action.payload.accesstoken;
        }
     }
})

export const {login, logout,updatetoken} = authSlice.actions;

export default authSlice.reducer;