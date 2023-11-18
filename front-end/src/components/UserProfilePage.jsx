import React, { useEffect, useState } from "react";
import HeaderWidget from "./widgets/HeaderWidget";
import ProfileWidget from "./widgets/ProfileWidget";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFoundWidget from "./widgets/PageNotFoundWidget";
import API from "../helper/API";
import UIServerNotAvailable from "./UI/UIServerNotAvailable";
import UIUNoHavePermis from "./UI/UIUNoHavePermis";
const UserProfilePage = (props) =>{
    const { someUser } = useParams();
    let [userIsExist, setUserIsExist] = useState();

    const userCheckExist = async () =>{
        let response = await API.Request("/user/exist/"+someUser, localStorage.getItem("auth"));
        if(response.status == 400||response.status == 404||response.status == 500){
            setUserIsExist("error");
            return;
        }
        if(response.status == 401){
            setUserIsExist("Unauthorized");
            return;
        }
        setUserIsExist(response.content);
    }

    useEffect(()=>{
        userCheckExist();
    },[])
    return(
        <div className="main main-profile-page">
            <HeaderWidget/>
            {userIsExist === true && (<ProfileWidget profileName={someUser}/>)}
            {userIsExist == "Unauthorized" && (<main><UIUNoHavePermis/></main>)}
            {userIsExist == "error" && (<main><UIServerNotAvailable/></main>)}
            {userIsExist === false && (<PageNotFoundWidget/>)}

            
        </div>
    )
}
export default UserProfilePage;