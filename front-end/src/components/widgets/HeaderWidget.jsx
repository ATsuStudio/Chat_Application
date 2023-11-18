import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../helper/API";
import UIDefaultBtn from "../UI/UIDefaultBtn";
import { disconnectSocket } from "../../helper/socketHelper";
import { emitEvent } from "../../helper/socketHelper";
export default class HeaderWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_in_system: false,
            user_name: "Sing in",
            user_path: "/auth",
            get_res_user_status: 0,
        };
        this.getUserReq = this.getUserReq.bind(this);
        this.logoutSystem = this.logoutSystem.bind(this);
        this.setDefautState = this.setDefautState.bind(this);
    }
    render() {
        return (
            <header>
                <h1>
                    <Link to="/">{this.props.title}</Link>
                </h1>
                <div className="auth-header-wrapper">
                    
                    {this.state.user_in_system && (
                    <UIDefaultBtn text="Chat" link="/chat" />
                    )}
                    <Link to={this.state.user_path}>
                        <button className="ui-default-btn">
                            {this.state.user_name}
                        </button>
                    </Link>
                    {this.state.user_in_system && (
                            <Link to="/">
                                <button
                                    className="ui-default-btn"
                                    onClick={() => this.logoutSystem()}
                                >
                                    Log out
                                </button>
                            </Link>
                    )}
                </div>
            </header>
        );
    }
    componentDidMount() {
        this.getUserReq();
    }

    setDefautState = () => {
        this.setState({
            user_in_system: false,
            user_name: "Sing in",
            user_path: "/auth",
            get_res_user_status: 0,
        });
    };

    logoutSystem = () => {
        localStorage.removeItem("auth");
        disconnectSocket();
        window.location.reload();
    };

    getUserReq = async () => {
        let response = await API.Request("/user/userCheck",localStorage.getItem("auth"));
        switch (response.status) {
            case 200:
                this.setState({
                    get_res_user_status: response.status,
                    user_in_system: true,
                    user_name: response.content.username,
                    user_path: "/user/" + response.content.username,
                });
                
                break;
            case 400:
                this.setState({
                get_res_user_status: response.status,
                user_in_system: false,
                user_name: "Sing in",
                user_path: "/auth",
            });
                break;
            case 500:
                this.setState({
                get_res_user_status: response.status,
                user_in_system: false,
                user_name: "Sing in",
                user_path: "/auth",
            });
                break;
            default:
                console.log("Unknow status");
                break;
        }
    };
}

HeaderWidget.defaultProps = {
    title: "AtsuStudio",
};
