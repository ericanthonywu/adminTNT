import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Axios from "axios";
import {api_url_clinic} from "../../global";
import {connect} from "react-redux";
import {login} from "../../redux/actions";

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    handleChangeText = e =>
        this.setState({
            [e.target.name]: e.target.value
        })

    login = e => {
        e.preventDefault()
        const {username, password} = this.state
        if (username && password) {
            Axios.post(`${api_url_clinic}login`, {
                username,
                password,
            }).then(data => {
                this.props.login({
                    token: data.token,
                    username: data.username,
                    id: data.id,
                    role: "clinic"
                })
                localStorage.clear()

                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('role', "clinic")

                Axios.defaults.headers.common = {token: data.token}; // set default header

                this.props.history.push("/dashboard")
            })
        } else {
            if (username) {
                this.username.focus()
            } else {
                this.password.focus()
            }
        }
    }

    username = React.createRef()
    password = React.createRef()

    render() {
        return (
            <MDBContainer fluid className={"loginbg"}>
                <MDBRow center>
                    <MDBCol size="4"/>
                    <MDBCol size="4" className={"login"}>
                        <MDBRow center>
                            <MDBCol center size="12" className={"loginPanelContainer"}>
                                <form onSubmit={this.login}>
                                    <h1>Tail and Tale Clinic Login</h1>
                                    <input ref={input => this.username = input} type="username"
                                           className="form-control mb-4" onChange={this.handleChangeText}
                                           name={"username"} title={"username"}
                                           placeholder="Username"/>
                                    <input ref={input => this.password = input} type="password"
                                           id="defaultLoginFormPassword"
                                           onChange={this.handleChangeText} name={"password"}
                                           className="form-control mb-4" placeholder="Password"/>
                                    <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>
                                </form>
                                <MDBRow>
                                    <MDBCol size="12"><a href="#">Forgot Password</a></MDBCol>
                                </MDBRow>
                            </MDBCol>

                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="4"/>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default connect(state => state.user, {login})(Login)
