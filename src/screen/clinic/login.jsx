import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Axios from "axios";
import {api_url_admin} from "../../global";

class Login extends React.Component{
    state = {
        username: "",
        password: ""
    }

    handleChangeText = e =>
        this.setState({
            [e.target.name]: e.target.value
        })

    login = () => {
        const {username,password} = this.state
        if(username && password){
            Axios.post(`${api_url_admin}login`,{
                username: username,
                password: password
            }).then(data => {
                localStorage.setItem('token',data.data.token)
                localStorage.setItem('username',data.data.username)
            })
        }
    }
    render() {
        return (
            <MDBContainer fluid className={"loginbg"}>
                <MDBRow center>
                    <MDBCol size="4"/>
                    <MDBCol size="4" className={"login"}>
                        <MDBRow center>
                            <MDBCol center size="12" className={"loginPanelContainer"}>
                                <form>
                                    <h1>Tail and Tale Clinic Login</h1>
                                    <input type="username" className="form-control mb-4" onChange={this.handleChangeText} name={"username"} title={"username"}
                                           placeholder="Username"/>
                                    <input type="password" id="defaultLoginFormPassword"
                                           onChange={this.handleChangeText} name={"password"}
                                           className="form-control mb-4" placeholder="Password"/>
                                    <button className="btn btn-info btn-block my-4" type="submit" onClick={this.login}>Sign in</button>
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
export default Login
