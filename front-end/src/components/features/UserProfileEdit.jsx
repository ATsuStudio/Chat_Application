import React, { useState } from "react";
import UIDefaultBtn from "../UI/UIDefaultBtn";
import API from "../../helper/API";
import UIErrorMsgField from "../UI/UIErrorMsgField";
const UserProfileEdit = (props) => {
    let [UserInfo, setUserInfo] = useState({
        name: props.user.name,
        age: props.user.age,
        bio: props.user.bio,
        mail: props.user.mail,
        gender: props.user.gender,
    });
    let [Message, setMessage] = useState();

    const Save = async ()=>{
        let data = { 
            age: UserInfo.age,
            bio: UserInfo.bio,
            email:UserInfo.mail,
            gender: UserInfo.gender
        }
        let result;
        if(props.user.status == 1){
            result = await API.Request("/user/info", localStorage.getItem("auth"), "PUT", data);
        }
        else{
            result = await API.Request("/user/info", localStorage.getItem("auth"), "POST", data);
        }
        console.log(result.status);
        if(result.status == 400 || result.status == 404){
            setMessage("Uncorrect values");
            return;
        }
        if(result.status == 500){
            setMessage("Server is not available");
            return;
        }
        if(result.status == 401){
            setMessage("Unauthorized");
            return;
        }
        props.onUpdate();
    }

    const handleChange = (event) => {
        event.preventDefault();
        setUserInfo({
            ...UserInfo,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="user-profile-block edit">
            <form onSubmit={handleSubmit} >
                <label>
                    Age
                    <input
                        type="number"
                        name="age"
                        placeholder="age"
                        value={UserInfo.age}
                        onChange={(e)=>handleChange(e)}
                        className="user-age"
                    ></input>
                </label>
                <label>
                    Info
                    <textarea
                        type="textarea"
                        name="bio"
                        placeholder="info"
                        value={UserInfo.bio}
                        onChange={(e)=>handleChange(e)}
                        className="user-bio"
                    ></textarea>
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="mail"
                        placeholder="email"
                        value={UserInfo.mail}
                        onChange={(e)=>handleChange(e)}
                        className="user-email"
                    ></input>
                </label>
                <label>
                    Gender
                    <input
                        type="text"
                        name="gender"
                        placeholder="gender"
                        value={UserInfo.gender}
                        onChange={(e)=>handleChange(e)}
                        className="user-gender"
                    ></input>
                </label>
                <UIDefaultBtn onClick={props.onUpdate} text="Cancel" />
                <UIDefaultBtn onClick={Save} text="Save" />
                <UIErrorMsgField text={Message} size="medium"/>
            </form>
        </div>
    );
};

export default UserProfileEdit;
