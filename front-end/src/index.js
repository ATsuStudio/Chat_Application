import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import "./style/main.css";
import "./style/lobby.css";
import "./style/auth.css";
import "./style/root.css";
import "./style/header.css";
import "./style/users.css";
import './style/pageNotFound.css';
import "./style/ui_item.css";
import "./style/profile.css";
import "./style/chat.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
