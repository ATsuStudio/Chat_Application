import React from "react";
const UserProfileShow = (props)=>{
    return (
        <table className="user-profile-block show">
            <tbody>
                <tr>
                    <td>Name: </td>
                    <td>{props.user.name}</td>
                </tr>
                <tr>
                    <td>Age: </td>
                    <td>{props.user.age}</td>
                </tr>
                <tr>
                    <td>Info: </td>
                    <td>{props.user.bio}</td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td>{props.user.mail}</td>
                </tr>
                <tr>
                    <td>Genger: </td>
                    <td>{props.user.gender}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default UserProfileShow;