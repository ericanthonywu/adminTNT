import React from "react";
import {
    MDBBtn,
    MDBCollapse,
    MDBFormInline, MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from "mdbreact";
import {connect} from "react-redux";
import {logout} from "../../redux/actions";
import {Link} from "react-router-dom";

class AdminNavbar extends React.Component {
    state = {
        isOpen: false,
        modal: true
    };

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    logout = () => {
        this.props.logout()
        this.props.history.push("/")
    }

    render() {
        return (
            <MDBNavbar fixed={"top"} color="white" white expand="md">
                <Link to={"/dashboard"}>
                    <MDBNavbarBrand>
                        <strong className="black-text">Tail n' Tale Admin Panel</strong>
                    </MDBNavbarBrand>
                </Link>
                <MDBNavbarToggler onClick={this.toggleCollapse}/>
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                    <input className="form-control mr-sm-4" type="text" placeholder="Search"
                                           aria-label="Search"/>
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem active>
                            <MDBBtn onClick={this.logout} className="black-text">Logout
                            </MDBBtn>
                        </MDBNavItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }

}

export default connect(state => state.user, {logout})(AdminNavbar)
