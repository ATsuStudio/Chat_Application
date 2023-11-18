import io from 'socket.io-client';
import { _CHAT_SOCKET_ENDPOINT } from '../AppConfig';

let socket = io(_CHAT_SOCKET_ENDPOINT,{
    query: { token: localStorage.getItem("auth") }
  });

export const connectSocket = () => {
    socket = io(_CHAT_SOCKET_ENDPOINT,{
        query: { token: localStorage.getItem("auth") }
    });
};

export const emitEvent = (event, data) => {
    socket.emit(event, data);
};

export const onEvent = (event, callback) => {
    socket.on(event, callback);
};

export const disconnectSocket = () => {
    socket.disconnect();
};
