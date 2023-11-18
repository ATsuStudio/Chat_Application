import React from "react";
import HeaderWidget from "./widgets/HeaderWidget";
import PageNotFoundWidget from "./widgets/PageNotFoundWidget";
const NotFoundPage = ()=>{
    let hello = () =>{
        console.log('hello');
    }
    return(
        
        <div className="main main-page-not-found">
            <HeaderWidget title='AtsuStudio'/>
            <PageNotFoundWidget/>
        </div>
    )
}
export default NotFoundPage;