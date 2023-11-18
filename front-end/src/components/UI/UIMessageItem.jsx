import React, { useEffect, useState } from "react";
import userIcon from "../../resources/user.svg";

const UIMesssageItem = (props) => {
    const [created, setCreated] = useState('');

    useEffect(()=>{
    const isoDateTime = props.message.created;
    const date = new Date(isoDateTime);
    const formattedDate = date.toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
    setCreated(formattedDate);
    },[])
    return (
        <div key={props.key} className={"ui-message-item "+ props.sender}>
            <div className="ui-message-icon ui-icon ">
                <img src={userIcon} />
            </div>
            <div className="ui-message-body">
                <strong className="message-name">{props.message.login} </strong>
                <span className="message-content">{props.message.content} </span>
                <span className="message-created">{created}</span>
            </div>
        </div>
    );
};

export default UIMesssageItem;
