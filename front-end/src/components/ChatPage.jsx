import React, { useEffect, useState } from "react";
import Socketio from "socket.io-client";
import HeaderWidget from "./widgets/HeaderWidget";
import { useLocation } from "react-router-dom";
import ChatWidget from "./widgets/ChatWidget";
import { _CHAT_SOCKET_ENDPOINT } from "../AppConfig";
import { emitEvent, onEvent, disconnectSocket } from "../helper/socketHelper";
import { useDispatch, useSelector } from "react-redux";
import UIErrorMsgField from "./UI/UIErrorMsgField";
import { actions as userInfoActions} from "../store/chat/userInfo.slice";

const ChatPage = () =>{

    let {chat} = useSelector(state =>state);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
        const searchParams = {component:"ChatPage"};
        emitEvent("reqJoin", searchParams);
        onEvent("resJoin", (data)=>{
            if(data.status ==400) return;
            dispatch(userInfoActions.setUserInfo(data.content));
        }) 
    },[location])

    return(
        <div className="main main-chat">
            <HeaderWidget />
            <ChatWidget/>

            {(chat.status == 400) &&(
                <UIErrorMsgField size="medium" text="Somthing went wrong" />
            )}
        </div>
    );
}

export default ChatPage;