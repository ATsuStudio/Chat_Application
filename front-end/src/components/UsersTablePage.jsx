import React, { useState } from "react";
import HeaderWidget from "./widgets/HeaderWidget";
import UserListWidget from "./widgets/UserListWidget";

const UserTablePage = ()=>{
    const [Title, setTitle] = useState('All users');
    const [Description, setDescription] = useState('This page is available only to the administrator and is intended to display all users');
    return(
        <div className="main main-user-table">
            <HeaderWidget />
            <UserListWidget title={Title} description={Description}/>

        </div> 
    )
}
export default UserTablePage;