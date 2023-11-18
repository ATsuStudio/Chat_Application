const chatController = require("../controllers/chatController");

const jwt = require("jsonwebtoken");
const { secret } = require("../tokenSettings");

module.exports = (io) => {
    
    const chat = io.of("/chat");

    chat.on("connection", async (socket) => {
        const token = socket.handshake.query.token;
        try {
            const payload = await jwt.verify(token, secret);
            if(payload.id){
                socket.uid = payload.id;
                socket.ulogin = payload.login;
                socket.urole = payload.role;

                chatController.chatConnect(socket,io);
            }
        } catch (error) {
            socket.emit("Error", {
                status: 401
            })
        }
        
            
    });
};
