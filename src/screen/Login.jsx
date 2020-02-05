import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBFormInline,
    MDBIcon, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBCard, MDBInput
} from "mdbreact";

class Login extends React.Component{
    render() {
        return (
            <MDBContainer fluid className={"loginbg"}>
                <MDBRow center>
                    <MDBCol size="4"></MDBCol>
                    <MDBCol size="4" className={"login"}>
                        <MDBRow center>
                                <MDBCol center size="12" className={"loginPanelContainer"}>
                                    <form>
                                        <h1>Tail and Tale Admin Login</h1>
                                        <input type="email" id="defaultLoginFormEmail" className="form-control mb-4"
                                               placeholder="E-mail"></input>
                                        <input type="password" id="defaultLoginFormPassword"
                                               className="form-control mb-4" placeholder="Password"></input>
                                        <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>

                                    </form>
                                    <MDBRow>
                                        <MDBCol size="12"><a href="#">Forgot Password</a></MDBCol>
                                    </MDBRow>
                                </MDBCol>

                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="4"></MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}
export default Login
