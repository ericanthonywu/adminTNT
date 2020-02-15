import React from "react";
import {toast, ToastContainer} from "react-toastify";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./screen/admin/Login";
import Error404 from "./screen/admin/Error404";
import Dashboard from "./screen/admin/dashboard";
import DetailClinic from "./screen/admin/detailclinic";
import clinicLogin from "./screen/clinic/login";
import Vet from "./screen/clinic/vet";
import clinicDashboard from "./screen/clinic/dashboard";
import appointmentHistory from "./screen/clinic/appointmentHistory";
import vetList from "./screen/clinic/vetList";
import Axios from "axios";
import {backend_url} from "./global";
import Navbar from "./screen/component/navbar";
import {login, logout} from "./redux/actions";

class App extends React.Component {

    generateProtectedRoute = () => {
        const role = localStorage.getItem("role"),
         token = localStorage.getItem("token"),
         username = localStorage.getItem("username"),
         id = localStorage.getItem("id");

        if (!role || !token || !username || !id) {
            return null
        }

        switch (role) {
            case "clinic":
                return (
                    <>
                        <Navbar/>
                        <Route path={'/dashboard'} exact component={clinicDashboard}/>
                        <Route path={'/vet'} exact component={Vet}/>
                        <Route path={'/appointmentHistory'} exact component={appointmentHistory}/>
                        <Route path={'/vetList'} exact component={vetList}/>
                    </>
                )
            case "admin":
                return (
                    <>
                        <Navbar/>
                        <Route path={'/admin/dashboard'} exact component={Dashboard}/>
                        <Route path={'/admin/detailClinic'} exact component={DetailClinic}/>
                    </>
                )
            default:
                return null
        }


        // TODO: add security role in JWT
        // Axios.post(`${backend_url}checkValidToken`,{
        //     token: token
        // }).then(data => {
        //     if(data.data.role !== role){
        //         return null
        //     }
        // switch (role) {
        //     case "clinic":
        //         return (
        //             <>
        //                 <Route path={'/dashboard'} exact component={clinicDashboard}/>
        //                 <Route path={'/vet'} exact component={Vet}/>
        //                 <Route path={'/appointmentHistory'} exact component={appointmentHistory}/>
        //                 <Route path={'/vetList'} exact component={vetList}/>
        //             </>
        //         )
        //     case "admin":
        //         return (
        //             <>
        //                 <Route path={'/admin/dashboard'} exact component={Dashboard}/>
        //                 <Route path={'/admin/detailClinic'} exact component={DetailClinic}/>
        //             </>
        //         )
        //     default:
        //         return null
        // }
        //
        // }).catch(err => toast.error("Token Expire"))
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        const username = localStorage.getItem("username")
        const id = localStorage.getItem("id")
        const role = localStorage.getItem("role")

        if (token && username && id && (role === "admin" || role === "clinic")) {
            this.props.login({
                token: token,
                username: username,
                id: id,
                role: role
            })
        } else {
            this.props.logout()
        }
    }

    render() {
        return (
            <div>
                <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT}/>
                <Switch>
                    <Route path={'/'} exact component={clinicLogin}/>
                    <Route path={'/admin/'} exact component={Login}/>
                    {this.generateProtectedRoute()}
                    <Route component={Error404}/>
                </Switch>
            </div>
        );
    }

}

export default withRouter(
    connect(state => state.user, {login, logout})(App)
)
