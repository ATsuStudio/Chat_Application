import React, { useEffect, useState } from "react";
import { _CHAT_SOCKET_ENDPOINT } from "../../AppConfig";
import { emitEvent, onEvent, disconnectSocket } from "../../helper/socketHelper";
import UIChatUserItem from "../UI/UIChatUserItem";
import { useDispatch, useSelector } from "react-redux";
import { actions as chatAction} from "../../store/chat/chat.slice";
import { actions as chatInfoAction } from "../../store/chat/chatInfo.slice";
import UIErrorMsgField from "../UI/UIErrorMsgField";
import UIUNoHavePermis from "../UI/UIUNoHavePermis";
import UIDefaultBtn from "../UI/UIDefaultBtn";

const UserSearchBlock = (props)=>{
    let [findUser, setFindUser] = useState('');
    let [userList, setUserList] = useState(null);

    const dispatch = useDispatch();

    const { user_info } = useSelector((state) => state);


    let handleChange = (e)=>{
        setFindUser(e.target.value);
    }
    let formSubmit = (e)=>{
        e.preventDefault();
    }



    useEffect(()=>{
        emitEvent("reqSearchUsers",{
            component: "UserSearchBlock",
            value:findUser,
        })
        onEvent("usersList",(body)=>{
            setUserList(body.content);
        })
    },[findUser])




    const onUserChoose = (user)=>{
        console.log(user);
        if(user.login == user_info.username){
            setFindUser('');
            return;
        }
        emitEvent("reqGetChat", {
            component: "UserSearchBlock",
            receiverLogin: user.login,
            receiverId: user.id,
        });
        onEvent("resGetChat", (body) =>{
            console.log(body);
            let chatInfo ={
                status: body.status,
                content: {
                    sender: body.content.sender,
                    receiver: body.content.receiver,
                    senderId: body.content.senderId,
                    receiverId: body.content.receiverId,
                    chatId: body.content.chat.id,
                }
            }
            let chat = {
                status: body.status,
                content:{
                    id: body.content.chat.id,
                    content: body.content.chat.content
                }
            }
            dispatch(chatAction.setChat(chat));
            dispatch(chatInfoAction.setChatInfo(chatInfo));
            emitEvent('reqJoinRoom', body.content.chat.id);
        })
        setFindUser('');
    }


    return (
        user_info.id == 0? (
        <>
            <UIErrorMsgField size="medium" text="You are not registred"/>
            <UIDefaultBtn link="/auth" text="Sing in" />
        </>) :(
        <div className="user-search-block">
            <form className="user-search-form" onSubmit={(e) => formSubmit(e)}>
                <input placeholder="Search" onChange={(e) => handleChange(e)} type="search" value={findUser} />
            </form>
                {userList && userList.length > 0 && (
                    <>
                        <div className="search-result-list">
                            {userList.map((user) => (
                                <UIChatUserItem onClick={()=>onUserChoose(user)}  key={user.id} text={user.login} />
                            ))}
                        </div>
                    </>
                )}
        </div>
        )
    );
}

export default UserSearchBlock;