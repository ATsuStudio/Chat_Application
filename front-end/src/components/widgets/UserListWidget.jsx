import React, { useEffect, useState } from "react";
import UserItem from "../UI/UIUserItem";
import UIUNoHavePermis from "../UI/UIUNoHavePermis";
import UIServerNotAvailable from "../UI/UIServerNotAvailable";
import API from "../../helper/API";
import UIPageTitle from "../UI/UIPageTitle";
function UserListWidget(props) {
    let [Users, setUsers] = useState([]);
    let [ResStatus, setResStatus] = useState();

    // Объявление функции внутри компонента
    const getUsersReq = async () => {
        let response = await API.Request("/user/users",localStorage.getItem("auth"));
        setResStatus(response.status);
        setUsers(response.content);
    };

    useEffect(() => {
        try {
            getUsersReq();
        } catch (error) {
            console.log("setUsers error" + error);
        }
    }, []); // Пустой массив зависимостей означает, что эффект будет вызываться только при монтировании и размонтировании компонента

    return (
        <main className="user-list-module">
            <UIPageTitle text="All users" />
            <p>{props.description}</p>
            {(ResStatus == 200 || ResStatus == 201) && (
                <table className="user-list">
                    <tbody>
                        {Users.map((user) => (
                            <UserItem user={user} key={user.id} />
                        ))}
                    </tbody>
                </table>
            )}
            {(ResStatus == 401 || ResStatus == 400) && (
                <UIUNoHavePermis/>
            )}
            {!(ResStatus == 200 || ResStatus == 201 ||ResStatus == 401 || ResStatus == 400) && (
                <UIServerNotAvailable/>
            )}
        </main>
    );
}

export default UserListWidget;
