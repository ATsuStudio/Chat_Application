import React, { useEffect } from "react";
import IAuthForm from './authForm/IAuthForm';
import HeaderWidget from "./widgets/HeaderWidget";

function AuthPage(){
    return (
        <div className="main main-auth">
            <HeaderWidget title="AtsuStudio"/>
            <IAuthForm/>
        </div>
    );
}

export default AuthPage;
