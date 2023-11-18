import React from "react";
import UIPageTitle from "../UI/UIPageTitle";
import UserSearchBlock from "../features/UserSearchBlock";
import UIDefaultBtn from "../UI/UIDefaultBtn";

import { useSelector } from "react-redux";
import ChatingBoxBlock from "../features/ChatingBoxBlock";

const ChatWidget = (props) =>{

    return (
        <main className="chat-widget">
            <UIPageTitle text="Chat"/>
            <UserSearchBlock />
            <ChatingBoxBlock/>
        </main>
    )
}

export default ChatWidget;