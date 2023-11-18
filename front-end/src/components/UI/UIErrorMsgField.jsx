import React, { useState } from "react";

const UIErrorMsgField = (props)=>{
    let [ClassName, setClassName] = useState("ui-error-msg " +props.size)
    return(
        <span className={ClassName}>{props.text}</span>
    )
}

export default UIErrorMsgField;