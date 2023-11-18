import React from "react";
import { Link } from 'react-router-dom';
import UIDefaultBtn from "../UI/UIDefaultBtn";

class LobbyRouterWidget extends React.Component {
    constructor(props){
        super(props);

        this.goToAuth = this.goToAuth.bind(this);
    }
    goToAuth = () => {
        return <Link to="/auth"/>
    };
    render(){
        return(
            <main className="lobby">
                <div className="lobby-header">
                    <strong>{this.props.title}</strong>
                </div>
                <div className="lobby-body">
                    <p>{this.props.content} </p>
                    <UIDefaultBtn link="/auth" text="Authorizate" />
                    <UIDefaultBtn link="/user/users" text="See users" />
                    <UIDefaultBtn link="/chat" text="Messanger" />

                </div>
            </main>
        );
    }
}
export default LobbyRouterWidget;