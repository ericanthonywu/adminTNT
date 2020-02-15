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

class Navbar extends React.Component {
    state = {
        isOpen: false,
        modal: true
    };

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <MDBNavbar color="white" white expand="md">
                <MDBNavbarBrand>
                    <strong className="black-text">Tail n' Tale Admin Panel</strong>
                </MDBNavbarBrand>
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
                            <MDBBtn onClick={this.props.logout} className="black-text" to="#!">Logout
                            </MDBBtn>
                        </MDBNavItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }

}

export default connect(state => state.user,{logout})(Navbar)
