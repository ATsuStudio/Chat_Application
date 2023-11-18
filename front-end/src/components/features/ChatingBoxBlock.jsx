import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UIDefaultBtn from "../UI/UIDefaultBtn";
import UIMesssageItem from "../UI/UIMessageItem";
import { emitEvent, onEvent } from "../../helper/socketHelper";
import { actions as chatAction } from "../../store/chat/chat.slice";
import { actions as  chatInfoAction} from "../../store/chat/chatInfo.slice";
import plusSvg from "../../resources/plus-svgrepo-com.svg";
const ChatingBoxBlock = () => {
    const { chat } = useSelector((state) => state);
    const { user_info } = useSelector((state) => state);
    const {chat_info} = useSelector((state) => state);
    const [chatInfo, setChatInfo] = useState(false);
    const [count, setCount] = useState(0);
    const chatBoxRef = useRef();
    const dispatch = useDispatch();

    const [messageText, setMessageText] = useState('');

    const onChatExit = () =>{
        setMessageText('');
        dispatch(chatAction.setDefault());
        dispatch(chatInfoAction.setDefault());
    }

    const onMessageChange = (e)=>{
        e.preventDefault();
        setMessageText(e.target.value);
        let result = {
            senderId: chat_info.content.senderId,
            receiverId: chat_info.content.receiverId,
        }
    }
    const onSendMessage= (e)=>{
        e.preventDefault();
        let msg = {
            chat_id: chat_info.content.chatId,
            sender: user_info.id,
            content: messageText
        }
        emitEvent("reqSendMessage",{
            component: "ChatingBoxBlock",
            content: msg
        })
        setMessageText("");

    }

    useEffect(() => {
        onEvent('resSendMessage', (body) => {
            console.log("Chating Update in the ROOM");
            setCount(prevCount => prevCount +1);
        });
    }, []);
    
    useEffect(()=>{
        if(0<count){
            let result = {
                senderId: chat_info.content.senderId,
                receiverId: chat_info.content.receiverId,
            }
            console.log(result);
            emitEvent("reqUpdateChat",{
                component: "ChatingBoxBlock",
                content: result
            })
            onEvent("resUpdateChat", (body)=>{
                dispatch(chatAction.setChat(body));
            })
        }
    }, [count]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chat]);
    useEffect(() => {
        let result = {
            senderId: chat_info.content.senderId,
            receiverId: chat_info.content.receiverId,
        }
    },[])


    if (chat.status == 200) {
        return (
            <div className="chating-box-block">
                <div className="chating-box-header">
                    <strong>{chat_info.content.receiver}</strong>
                    <img onClick={onChatExit} src={plusSvg} />
                </div>

                <div className="chating-box-body">
                    <div className="chating-msg-box" ref={chatBoxRef}>
                        {chat.content.content.map((msg) => {
                            return (
                                <UIMesssageItem key={msg.id} message={msg} sender={chat_info.content.sender == msg.login ? "sender" : "receiver"}
                                />
                            );
                        })}
                    </div>
                    <form className="msg-input-form">
                        <textarea onChange={(e) =>onMessageChange(e)} className="msg-input-textarea" placeholder="Message" value={messageText} />
                        <UIDefaultBtn onClick={(e) =>onSendMessage(e)} text="Send"/>
                    </form>
                </div>
            </div>
        );
    }
};

export default ChatingBoxBlock;







    // chat = {
    //     "status": 200,
    //     "content": {
    //         "sender": "useruser2",
    //         "receiver": "admin",
    //         "chat": {
    //             "id": 1,
    //             "content": [
    //                 {
    //                     "login": "admin",
    //                     "content": "Hello",
    //                     "created": "2023-11-09T00:50:53.000Z"
    //                 },
    //                 {
    //                     "login": "useruser2",
    //                     "content": "Hi",
    //                     "created": "2023-11-09T01:46:46.000Z"
    //                 }
    //             ]
    //         }
    //     }
    // }