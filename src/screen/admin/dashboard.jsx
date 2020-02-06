import React from "react"
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
    MDBIcon, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBCard
} from "mdbreact";

class Dashboard extends React.Component{

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }



    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>
                    <MDBNavbar color="white" white expand="md">
                        <MDBNavbarBrand>
                            <strong className="black-text">Tail n' Tale Admin Panel</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem>
                                    <MDBFormInline waves>
                                        <div className="md-form my-0">
                                            <input className="form-control mr-sm-4" type="text" placeholder="Search" aria-label="Search" />
                                        </div>
                                    </MDBFormInline>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem active>
                                    <MDBNavLink className="black-text" to="#!">Logout
                                    </MDBNavLink>
                                </MDBNavItem>

                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>

                <MDBRow className={"contentContainer"}>
                    <MDBCol size="2">
                        <MDBBtn color="blue" href="#">Add Clinic</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"contentContainer"}>



                    <MDBCard style={{ width: "20%", margin: "20px" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Clinic A</MDBCardTitle>
                            <MDBCardText small>
                                17/02/2020
                            </MDBCardText>
                            <MDBCardText>
                                Size: 5 Veteranians
                            </MDBCardText>
                            <MDBCardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
                            </MDBCardText>
                            <MDBBtn href="#">View</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard style={{ width: "20%", margin: "20px" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Clinic A</MDBCardTitle>
                            <MDBCardText small>
                                17/02/2020
                            </MDBCardText>
                            <MDBCardText>
                                Size: 5 Veteranians
                            </MDBCardText>
                            <MDBCardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
                            </MDBCardText>
                            <MDBBtn href="#">View</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard style={{ width: "20%", margin: "20px" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Clinic A</MDBCardTitle>
                            <MDBCardText small>
                                17/02/2020
                            </MDBCardText>
                            <MDBCardText>
                                Size: 5 Veteranians
                            </MDBCardText>
                            <MDBCardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
                            </MDBCardText>
                            <MDBBtn href="#">View</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard style={{ width: "20%", margin: "20px" }}>
                    <MDBCardBody>
                        <MDBCardTitle>Clinic A</MDBCardTitle>
                        <MDBCardText small>
                            17/02/2020
                        </MDBCardText>
                        <MDBCardText>
                            Size: 5 Veteranians
                        </MDBCardText>
                        <MDBCardText>
                            Some quick example text to build on the card title and make
                            up the bulk of the card&apos;s content.
                        </MDBCardText>
                        <MDBBtn href="#">View</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
                </MDBRow>
            </MDBContainer>
        );
    }

}
export default Dashboard
