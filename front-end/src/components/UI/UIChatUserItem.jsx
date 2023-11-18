import React from "react";

const UIChatUserItem = (props)=>{
    return(
        <div onClick={props.onClick} className="ui-chat-user-item">
            <span>{props.text}</span>
        </div>
    )
}

export default UIChatUserItem;