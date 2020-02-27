import React from "react";
import {
    MDBBtn, MDBCol,
    MDBCollapse,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink, MDBRow
} from "mdbreact";
import {connect} from "react-redux";
import {logout} from "../../redux/actions";
import {Link} from "react-router-dom";
import Socket from "socket.io-client";
import {api_url_clinic, backend_url} from "../../global";
import Axios from "axios";

class ClinicNavbar extends React.Component {
    state = {
        isOpen: false,
        notification: false
    };

    componentDidMount() {
        const socket = Socket(backend_url, {
            query: {
                id: this.props.id,
                client: 'clinic',
            },
        });

        Axios.post(`${api_url_clinic}getClinicNotification`, {
            token: this.props.token
        }).then(r => {

        })

        socket.on("newAppointment", data => {

        })
    }

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    logout = () => {
        this.props.logout()
        this.props.history.push("/")
    }

    render() {
        return (
            <>
                <MDBNavbar fixed={"top"} scrollingNavbarOffset={100} scrolling color="white" white expand="md">
                    <Link to={"/dashboard"}>
                        <MDBNavbarBrand>
                            <strong className="black-text">Tail and Tale Clinic</strong>
                        </MDBNavbarBrand>
                    </Link>
                    <MDBNavbarToggler onClick={this.toggleCollapse}/>
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>

                        <MDBNavbarNav left>
                            <MDBNavItem className={"customNavItem"}><Link to={"/appointmentHistory"}>Appointment
                                History</Link></MDBNavItem>
                            <MDBNavItem className={"customNavItem"}><Link
                                to={"/vetList"}>Veteranians</Link></MDBNavItem>
                            <MDBNavItem>

                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem style={{marginRight: 20, paddingTop:10}}>
                                <div className="notificationValue">
                                    <p style={{color: "#fff", lineHeight: "32px", fontWeight: "bold"}}>1</p>
                                </div>
                                <MDBNavLink className="black-text"
                                            onClick={() => this.setState({notification: !this.state.notification})}
                                            to="#!">
                                    <i style={{paddingTop: 0, fontSize: 24}} className="far fa-bell"/>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBBtn className="black-text" onClick={this.logout}>Logout
                                </MDBBtn>
                            </MDBNavItem>

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
                {
                    this.state.notification ?
                        <div className="notificationToolTip">
                            <div className={"notificationItem"}>
                                <h5 style={{fontSize: 16}}>New Booking Appointment</h5>
                                <p>#A123123 <span
                                    style={{fontWeight: "bold", marginLeft: 10, paddingBottom: 5}}>Eric Anthony</span>
                                </p>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBBtn>Accept</MDBBtn>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBBtn color="danger">Reject</MDBBtn>

                                    </MDBCol>
                                </MDBRow>
                            </div>

                            <div className={"notificationItem"}>
                                <h5 style={{fontSize: 16}}>New Booking Appointment</h5>
                                <p>#A123123 <span
                                    style={{fontWeight: "bold", marginLeft: 10, paddingBottom: 5}}>Eric Anthony</span>
                                </p>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBBtn>Accept</MDBBtn>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBBtn color="danger">Reject</MDBBtn>

                                    </MDBCol>
                                </MDBRow>
                            </div>

                            <div className={"notificationItem"}>
                                <h5 style={{fontSize: 16}}>New Booking Appointment</h5>
                                <p>#A123123 <span
                                    style={{fontWeight: "bold", marginLeft: 10, paddingBottom: 5}}>Eric Anthony</span>
                                </p>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBBtn color={"indigo"}>Accept</MDBBtn>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBBtn color="danger">Reject</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                            <div className={"notificationItem"}>
                                <h5 style={{fontSize: 16}}>New Booking Appointment</h5>
                                <p>#A123123 <span
                                    style={{fontWeight: "bold", marginLeft: 10, paddingBottom: 5}}>Eric Anthony</span>
                                </p>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBBtn>Accept</MDBBtn>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBBtn color="danger">Reject</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </div>


                        </div>
                        :
                        null
                }
            </>
        );
    }

}

export default connect(state => state.user, {logout})(ClinicNavbar)
