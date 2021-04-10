import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
} from "mdbreact";
import Axios from "axios";
import {api_url_admin} from "../../global";
import {toast} from "react-toastify";
import {login} from "../../redux/actions";
import {connect} from "react-redux";

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        loading: false
    }

    handleChangeText = e => {
        const {name, value} = e.target
        switch (name) {
            case "long":
                return this.setState({
                    data: {
                        ...this.state.data,
                        session: {coordinates: [parseInt(value), this.state.data.session.coordinates ? this.state.data.session.coordinates[1] : null]}
                    }
                })
            case "lat":
                return this.setState({
                    data: {
                        ...this.state.data,
                        session: {coordinates: [this.state.data.session.coordinates ? this.state.data.session.coordinates[0] : null, parseInt(value)]}
                    }
                })
        }
        this.setState({
            [name]: value
        })
    }

    login = () => {
        const {username, password} = this.state
        if (username && password) {
            this.setState({
                loading: true
            })
            Axios.post(`${api_url_admin}login`, {
                username,
                password,
            }).then(data => {
                localStorage.clear()
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('id', data.id)
                localStorage.setItem('role', 'admin')

                this.props.login({
                    token: data.token,
                    username: data.username,
                    id: data.id,
                    role: 'admin'
                })

                Axios.defaults.headers.common = {token: data.token}; // set default header
                this.props.history.push("/admin/dashboard")
            }).catch(() => toast.error("Username atau password salah"))
                .finally(() => this.setState({loading: false}))
        } else {
            if (!username) {
                this.username.focus()
            } else {
                this.password.focus()
            }
        }
    }
    username = React.createRef()
    password = React.createRef()

    componentDidMount() {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if (token && username && id && role) {
            this.props.login({
                token,
                username,
                id,
                role
            })

            Axios.defaults.headers.common = {token}; // set default header
            this.props.history.push("/admin/dashboard")
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
                                <form onSubmit={e => e.preventDefault()}>
                                    <h1>Tail and Tale Admin Login</h1>
                                    <input ref={input => this.username = input} type="username"
                                           className="form-control mb-4" onChange={this.handleChangeText}
                                           name={"username"} title={"username"}
                                           placeholder="Username"/>
                                    <input type="password" id="defaultLoginFormPassword"
                                           ref={input => this.password = input}
                                           onChange={this.handleChangeText} name={"password"}
                                           className="form-control mb-4" placeholder="Password"/>
                                    <button className="btn btn-info btn-block my-4"
                                            disabled={this.state.loading}
                                            onClick={this.state.loading ? null : this.login}>{this.state.loading ? "Loading ..." : "Sign in"}</button>
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

export default connect(null, {login})(Login)
