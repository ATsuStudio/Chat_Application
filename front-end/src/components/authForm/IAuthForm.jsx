import React from "react";
import { useNavigate , useLocation, useParams } from 'react-router-dom';
import API from "../../helper/API";

const withRouter = (Component)=> {
  return function WrappedComponent(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component {...props} router={{ location, navigate, params }} />
    );
  };
}
class IAuthForm extends React.Component {
    handleButtonClick = () => {
        this.props.router.navigate('/');
      };
    constructor(props) {
        super(props);
        console.log("form constucted");
        this.state = {
            login: "",
            password: "",
            auth_mode: "Login",
            message: "",
            status_id: 0,
        };
        this.loginBtn = this.loginBtn.bind(this);
        this.responseMsg = this.responseMsg.bind(this);
    }

    render() {
        return (
            <main className="form-wrapper" auth_mode={this.state.auth_mode}>
                <div className="auth-swicher">
                    <span className="log-swch" onClick={this.loginBtnEvent}>
                        Log in
                    </span>
                    <span className="sing-swch" onClick={this.singBtnEvent}>
                        Sing in
                    </span>
                </div>
                <form className="authForm">
                    <label>{this.state.auth_mode}</label>
                    <input
                        value={this.state.login}
                        onChange={(e) =>
                            this.setState({ login: e.target.value })
                        }
                        type="text"
                        placeholder="Enter login"
                    />
                    <input
                        value={this.state.password}
                        onChange={(e) =>
                            this.setState({ password: e.target.value })
                        }
                        type="password"
                        placeholder="Enter password"
                    />
                    <button onClick={this.loginBtn.bind(this)}>
                        {this.state.auth_mode}
                    </button>
                    <span
                        className="authMsgLabel"
                        status_id={this.state.status_id}
                    >
                        {this.state.message}
                    </span>
                </form>
            </main>
        );
    }
    
    singBtnEvent = () => {
        console.log("Sing btn");
        this.setState({
            auth_mode: "Singin",
            login: "",
            password: "",
            message: "",
        });
    };
    loginBtnEvent = () => {
        console.log("Log btn");
        this.setState({
            auth_mode: "Login",
            login: "",
            password: "",
            message: "",
        });
    };
    async loginBtn(e){
        e.preventDefault();
        if (!this.state.login || 
            !this.state.password ||
            this.state.password.length<8 ||
            this.state.password.length>56
            ){
            this.setState({
                status_id: 400,
                message: "Invalid username or password",
            });
            return;
        }
        let data = {
            login: this.state.login,
            password: this.state.password,
        };
        if(this.state.auth_mode === "Login"){

            let response = await API.Request('/auth/login',"","POST", data)
            this.responseMsg(response.status);
        } 
        else if (this.state.auth_mode === "Singin"){
            let response = await API.Request('/auth/singin', "","POST", data)
            if(response.status === 200) {
                this.responseMsg(response.status);
                localStorage.setItem('auth', response.content);
            }
            else{
            this.responseMsg(response.status);
            }

        }
    };
    responseMsg = (status) => {
        switch (status) {
            case 200:
                this.setState({
                    status_id: status,
                    message: "Singed successful",
                });
                this.setState({ login: "", password: "" });
                this.handleButtonClick();

                break;
            case 201:
                this.setState({
                    status_id: status,
                    message: "Logined successful",
                });
                this.setState({ login: "", password: "" });

                setTimeout(() => {
                    this.singBtnEvent();
                }, 1000);

                break;

            case 400:
                this.setState({
                    status_id: status,
                    message: "Invalid username or password",
                });
                this.setState({ password: "" });
                break;
            case 401:
                this.setState({
                    status_id: status,
                    message: "User with that login is exist",
                });
                this.setState({ password: "" });
                break;
            default:
                break;
        }
    };
}

export default withRouter( IAuthForm);
