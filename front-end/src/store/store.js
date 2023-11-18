import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {reducer as userChat} from "./chat/chat.slice"
import {reducer as userInfoSlice} from "./chat/userInfo.slice"
import { reducer as chatInfo } from "./chat/chatInfo.slice";
const redusers = combineReducers({
    chat: userChat,
    user_info: userInfoSlice,
    chat_info: chatInfo
});

export const store = configureStore({
    reducer: redusers,
    devTools: true
});