import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id: 0,
    username: "unknown",
    role: "unknown"
}

export const userInfoSlice = createSlice({
    name: "userInfoSlice",
    initialState,
    reducers:{
        setUserInfo:(state,{payload})=>{
            return payload;
        },
        setDefault:(state,{payload})=>{
            return initialState;
        },
    }
})

export const {actions, reducer} = userInfoSlice