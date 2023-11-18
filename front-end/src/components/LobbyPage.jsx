import React, { useEffect } from "react";
import HeaderWidget from "./widgets/HeaderWidget";
import LobbyRouterWidget from "./widgets/LobbyRouterWidget";
import { connectSocket, emitEvent, onEvent } from "../helper/socketHelper";
import { useDispatch } from "react-redux";
import { actions as userInfoActions } from "../store/chat/userInfo.slice";
const LobbyPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("REGISTRIRYEM");
        connectSocket();
        const searchParams = {component:"LobbyPage"};
        emitEvent("reqJoin", searchParams);
        onEvent("resJoin", (data)=>{
            console.log("VOT > "+ data);
            if(data.status ==400) return;
            dispatch(userInfoActions.setUserInfo(data.content));
        }) 
    },[])
    return (
        <div className="main main-lobby">
            <HeaderWidget title="AtsuStudio" />
            <LobbyRouterWidget
                title="My test project"
                content="In this test project, I'm trying to explore the capabilities of NodeJS with the same frameworks as ExpressJS for data processing (backend) as well as ReactJS for the user interface (frontend). Real-time chat is also implemented here using WebSockets."
            />
        </div>
    );
};

export default LobbyPage;
