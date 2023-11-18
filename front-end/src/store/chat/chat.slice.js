import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: 0,
    content:{
            id: 0,
            content: []
        }
}

export const ChatSlice = createSlice({
    name: "chat",
    initialState,
    reducers:{
        setChat:(state,{payload})=>{
            return payload;
        },
        
        setDefault:(state,{payload})=>{
            return initialState;
        },
    }
})

export const {actions, reducer} = ChatSlice