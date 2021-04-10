import React from "react";
import {toast, ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./screen/admin/Login";
import Error404 from "./screen/Error404";
import Dashboard from "./screen/admin/dashboard";
import DetailClinic from "./screen/admin/detailclinic";
import clinicLogin from "./screen/clinic/login";
import clinicDashboard from "./screen/clinic/dashboard";
import appointmentHistory from "./screen/clinic/appointmentHistory";
import vetList from "./screen/clinic/vetList";
import Axios from "axios";
import {backend_url} from "./global";
import Navbar from "./screen/component/adminNavbar";
import {login, logout} from "./redux/actions";
import ClinicNavbar from "./screen/component/clinicNavbar";
import Vet from "./screen/admin/Vet";
import EditVet from "./screen/admin/EditVet";
import Chat from "./screen/admin/Chat";
import Blog from "./screen/admin/Blog/Blog";
import AddBlog from "./screen/admin/Blog/AddBlog";
import EditBlog from "./screen/admin/Blog/EditBlog";


class App extends React.Component {

    generateProtectedRoute = () => {
        switch (this.props.role) {
            case "clinic":
                return (
                    <BrowserRouter basename={"/"}>
                        <ClinicNavbar {...this.props}/>
                        <Route path={'/dashboard'} exact component={clinicDashboard}/>
                        <Route path={'/vet'} exact component={Vet}/>
                        <Route path={'/appointmentHistory'} exact component={appointmentHistory}/>
                        <Route path={'/vetList'} exact component={vetList}/>
                    </BrowserRouter>
                );
            case "admin":
                return (
                    <BrowserRouter basename="/admin">
                        <Navbar {...this.props}/>
                        <Route path={'/dashboard'} exact component={Dashboard}/>
                        <Route path={'/vet'} exact component={Vet}/>
                        <Route path={'/blog'} exact component={Blog}/>
                        <Route path={'/blog/add'} exact component={AddBlog}/>
                        <Route path={'/blog/edit/:id'} exact component={EditBlog}/>
                        <Route path={'/vet/:id'} exact component={EditVet}/>
                        <Route path={'/detailClinic/:clinicId'} exact component={DetailClinic}/>
                        <Route path={'/chat'} exact component={Chat}/>
                    </BrowserRouter>
                );
            default:
                return null
        }
    };

    componentDidMount() {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        this.props.login({
            token,
            username,
            id,
            role
        })

        Axios.defaults.headers.common = {token: this.props.token || token}; // set default header

        //global axios handler
        Axios.interceptors.response.use(({data: {data}}) => data, err => {
            const {response} = err;
            if (!response) {
                toast.error("No Connection")
            } else {
                switch (response.status) {
                    case 419:
                        // session expire
                        this.props.logout();
                        this.props.history.push("/");
                        toast.error("Token Expire");
                        break;
                    case 500:
                        // error server like mongodb, etc
                        console.log(response.data); //TODO: Remove on Prod
                        const {errmsg, code} = response.data.error
                        switch (code) {
                            case 11000:
                                Object.keys("keyValue").forEach(key => {
                                    toast.error(`Field ${key} duplicated`)
                                })
                                break;
                            default:
                                toast.error(`Something error with code ${code} \n Message : ${errmsg}`)
                                console.log(errmsg)
                        }
                        break;
                    case 401:
                        // unauthorized
                        toast.error("username / password salah");
                        break;
                    case 403:
                        // verified but has error (?)
                        toast.error("Email status not verified")
                        break;
                    default:

                }
            }
            return Promise.reject(response);
        });
    }

    checkValidToken = (token, username, id, role) => {
        Axios.post(`${backend_url}checkValidToken`, {
            token: token
        }).then(async data => {
            // if (data.data.role !== role) {
            //     return null
            // }

            await this.props.login({
                token: token,
                username: username,
                id: id,
                role: data.role
            });
            localStorage.setItem("role", data.role)

        }).catch(err => {
            if (!err) {
                // return this.checkValidToken(token, username, id, role)
                return toast.error("No Connection, please refresh web")
            }
            this.props.history.push("/");
            this.props.logout()
        })
    };

    render() {
        return (
            <div>
                <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT}/>
                <Switch>
                    <Route path={'/'} exact component={clinicLogin}/>
                    <Route path={'/admin'} exact component={Login}/>
                    {this.props.role ? this.generateProtectedRoute() : null}
                    <Route component={Error404}/>
                </Switch>
            </div>
        );
    }

}

export default withRouter(
    connect(state => state.user, {login, logout})(App)
)
