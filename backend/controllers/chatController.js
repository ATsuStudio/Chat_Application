const Chat = require("../modules/chat");
const User = require("../modules/user");

class chatController{
    chat = new Chat();
    user = new User();

    chatConnect = (Socket, io) => {
        Socket.on("reqJoin", (body)=>{
            console.log(`Joined user> ${Socket.uid} ${Socket.ulogin} ${Socket.urole}`);
            Socket.emit("resJoin",{
                status: 200,
                content: {
                    id: Socket.uid,
                    username: Socket.ulogin,
                    role:Socket.urole
                }
            })
        })
        Socket.on('reqJoinRoom', async(room) => {
            await Socket.join(room);
            io.of("/chat").to(room).emit("resJoinChat", "Join in the chat roomblya");
            
        });
        


        Socket.on("reqSearchUsers", async (body)=>{
            let usersList = await this.userSearch(body.value);
            Socket.emit("usersList",{
                status: 200,
                content: usersList
            })
        })


        Socket.on("reqGetChat", async (body)=>{
            let SenderId = Socket.uid;
            let ReceiverId = body.receiverId;

            let chat = await this.getChat(SenderId,ReceiverId);

            let SenderLogin = Socket.ulogin;
            let ReceiverLogin = body.receiverLogin;

            let Participants ={
                sender: SenderLogin,
                receiver: ReceiverLogin,
                senderId: SenderId,
                receiverId: ReceiverId,
            }
            if(!chat){
                Socket.emit("resGetChat",{
                    status: 400,
                    content: "Uncorrect value"
                })
                return;
            }

            let result = {...Participants, ...chat};

            Socket.emit("resGetChat",{
                status: 200,
                content: result
            })
        })


        Socket.on("reqUpdateChat", async (body)=>{
            console.log("THAT> " + JSON.stringify(body));
            let {senderId, receiverId} = body.content;
            if(!senderId || !receiverId || senderId==receiverId) {
                console.log("Uncorrect values (UpdateChat)> senderId> " + senderId + " receiverId> " + receiverId);
                Socket.emit("resUpdateChat",{
                    status: 400,
                    content: "Uncorrect values (UpdateChat)"
                })
                return;
            }
            let chat = await this.getChat(senderId,receiverId);
            Socket.emit("resUpdateChat",{
                status: 200,
                content: chat.chat
            })
        })



        Socket.on("reqSendMessage", async(body)=>{
            let {chat_id, sender, content } = body.content;
            let result =  await this.addMessage(chat_id,sender,content);
            result = result? "Message added successful": "Error to add message";

            io.of("/chat").to(chat_id).emit("resSendMessage", {
                status: 200,
                content: result
            });
        })
        


        // Socket.on("reqSendMessage", async(body)=>{
        //     let {chat_id, sender, content } = body.content;
        //     let result =  await this.addMessage(chat_id,sender,content);
        //     result = result? "Message added successful": "Error to add message";
        //     console.log(result);
        //     Socket.emit("resSendMessage", {
        //         status: 200,
        //         content: result
        //     });
        // })






        Socket.on("disconnect", ()=>{
            console.log("Disconnect");
        })
    }




    getChat = async (Sender,Receiver) =>{
        if (!Receiver || !Sender) return false;
        if (Sender == Receiver) return false;

        let chatID =  await this.getChatId(Sender,Receiver );
        return( await this.chat.getChat(chatID));
    }

    getChatId = async (sender, receiver)=>{
        if(sender == receiver) return;
        let chatID = await this.chat.getChatId(sender,receiver);
        if(!chatID){
            chatID = await this.chat.createChat();
            
            await this.chat.addParticipants(chatID, sender);
            await this.chat.addParticipants(chatID, receiver);
            return chatID;
        }
        return chatID.chat_id;
    }

    async userSearch(value) {
        let userObject = await this.user.findUser(value);
        return(userObject);
    }

    addMessage= async (ChatID, UserId, Content) =>{

        let content = Content;
        let chatID =ChatID;
        let uid = UserId;
        if(!content || !uid || !chatID) {
            console.error(`Uncorrect values! content> ${content} uid> ${uid} chatID>${chatID}`);
            return;
        }

        let result = await this.chat.addMessage(chatID, uid,content);
        return(result);
    }
}

module.exports = new chatController;