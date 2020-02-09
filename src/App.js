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

class App extends React.Component{
  render() {
    return (
        <div>
          <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT}/>
            <Switch>
                <Route path={'/'} exact component={clinicLogin}/>
                <Route path={'/dashboard'} exact component={clinicDashboard}/>
                <Route path={'/vet'} exact component={Vet}/>
                <Route path={'/appointmentHistory'} exact component={appointmentHistory}/>
                <Route path={'/vetList'} exact component={vetList}/>

                <Route path={'/admin/'} exact component={Login}/>
                <Route path={'/admin/dashboard'} exact component={Dashboard}/>
                <Route path={'/admin/detailClinic'} exact component={DetailClinic}/>
                <Route component={Error404}/>
            </Switch>
        </div>
    );
  }

}

export default withRouter(
    connect(state => state.user)(App)
)
