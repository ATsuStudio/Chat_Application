import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: 0,
    content: {
        sender: "",
        receiver: "",
        senderId: "",
        receiverId: "",
        chatId:0
    }
}

export const ChatInfoSlice = createSlice({
    name: "chatInfo",
    initialState,
    reducers:{
        setChatInfo:(state,{payload})=>{
            return payload;
        },
        setDefault:(state,{payload})=>{
            return initialState;
        },
    }
})

export const {actions, reducer} = ChatInfoSlice