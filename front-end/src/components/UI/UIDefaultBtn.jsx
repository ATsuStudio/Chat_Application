import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const UIDefaultBtn = (props) => {
    const [BtnLink, setBtnLink] = useState(props.link || "null");
    const navigate = useNavigate();
    const btnEvent = (e)=>{
        e.preventDefault();
        navigate(BtnLink);
    }
    return (
        <>
            {BtnLink == "null" && (
                <button onClick={props.onClick} className={"ui-default-btn " + props.classes}>
                    {props.text}
                </button>
            )}
            {BtnLink != "null" && (
                <button onClick={(e)=>btnEvent(e)} className={"ui-default-btn " + props.classes}>{props.text}</button>
            )}
        </>
    );
};

UIDefaultBtn.defaultProps = {
    text: 'Home page', // Здесь укажите текст по умолчанию
};
export default UIDefaultBtn;
