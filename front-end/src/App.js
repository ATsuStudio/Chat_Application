import React from 'react';
import AuthPage from './components/AuthPage';
import LobbyPage from './components/LobbyPage';
import UsersTablePage from "./components/UsersTablePage";
import NotFoundPage from './components/NotFoundPage';
import UserProfilePage from './components/UserProfilePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthPage />} />
          <Route path="/" element={<LobbyPage />} />
          <Route path="/user/users" element={<UsersTablePage />} />
          <Route path="/user/:someUser" element={<UserProfilePage/>} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App
