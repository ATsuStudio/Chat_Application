import React from "react";

const UserItem = (props)=>{
    return(
        <tr>
            <td>{props.user.id}</td>
            <td>{props.user.login}</td>
            <td>{props.user.password}</td>
            <td>{props.user.status}</td>
            <td>{props.user.type}</td>
        </tr>
    )
}

export default UserItem;