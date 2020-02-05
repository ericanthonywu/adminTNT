import React from "react";
import {toast, ToastContainer} from "react-toastify";
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./screen/Login";
import Error404 from "./screen/Error404";
import Dashboard from "./screen/dashboard";
import detailclinic from "./screen/detailclinic";

class App extends React.Component{

  render() {
    return (
        <div>
          <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT}/>
            <Switch>
                <Route path={'/'} exact component={Login}/>
                <Route path={'/dashboard'} exact component={Dashboard}/>
                <Route path={'/detailclinic'} exact component={detailclinic}/>
                <Route component={Error404}/>
            </Switch>
        </div>
    );
  }

}

export default withRouter(
    connect(state => state.user)(App)
)
