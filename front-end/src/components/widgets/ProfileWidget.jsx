import React, { useEffect, useState } from "react";
import UIDefaultBtn from "../UI/UIDefaultBtn";
import UserProfileShow from "../features/UserProfileShow";
import UIServerNotAvailable from "../UI/UIServerNotAvailable";
import UserProfileEdit from "../features/UserProfileEdit";
import API from "../../helper/API";
import UIPageTitle from "../UI/UIPageTitle";
import UIUNoHavePermis from "../UI/UIUNoHavePermis";
const ProfileWidget = (props) => {
    let [ProfileMode, setProfileMode] = useState();
    let [PersonalProfile, setPersonalProfile] = useState(false);
    let [HavePermission, setHavePermission] = useState(false);
    let [ProfileInfo, setProfileInfo] = useState(null);

    let Update = async ()=>{
        await getProfileInfo();
        SwichMode();
    }

    let SwichMode = () => {
        console.log("Swich");
        setProfileMode(ProfileMode == "Show"? "Edit":"Show");
    };

    const checkPermission = async () => {
        let result = await API.Request("/user/userCheck", localStorage.getItem("auth"), "GET");
        if(result.status != 200)
            return;
        if(result.content.username != props.profileName)
            return;
        
        setHavePermission(true);
    };


    const getProfileInfo = async () => {
        let result = await API.Request("/user/info/" + props.profileName,  localStorage.getItem("auth"),  "GET");
        if (result.status == 400 || result.status == 404 || result.status == 401||result.status == 500) {
            setProfileMode("Error");
            return;
        }
        if((result.content).length<1){
            setProfileInfo({
                status: 0,
                name: props.profileName,
            });
            return;
        }
            result.content[0].status = 1;
            result.content[0].name = props.profileName;
            setProfileInfo(result.content[0]);
    };


    useEffect(() => {
        Update();
        checkPermission();
    }, [props.profileName]);
    return (
        <main className="main-profile-widget">
            <UIPageTitle text={props.profileName+" profile"} />
            {ProfileMode == "Show" && (
                <UserProfileShow user={ProfileInfo} />
            )}
            {ProfileMode == "Edit" && (
                <UserProfileEdit onUpdate={Update} user={ProfileInfo} />
            )}

            {ProfileMode == "Error" && (<UIServerNotAvailable />)}
            
            {(HavePermission == true &&  ProfileMode == "Show")&& (
                <UIDefaultBtn onClick={SwichMode} text="Edit" />
            )}
        </main>
    );
};

export default ProfileWidget;
