import React from "react";
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle,
    MDBCol,
    MDBCollapse,
    MDBContainer, MDBFormInline,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem, MDBNavLink, MDBRow
} from "mdbreact";

class vetList extends React.Component{
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
                        <strong className="black-text">Tail and Tale Clinic</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>

                        <MDBNavbarNav left>
                            <MDBNavItem className={"customNavItem"}><a href="#">Appointment History</a></MDBNavItem>
                            <MDBNavItem className={"customNavItem"}><a href="#">Veteranians</a></MDBNavItem>
                            <MDBNavItem>

                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem style={{marginRight:20}}>
                                <div className="notificationValue">
                                    <p style={{color:"#fff", lineHeight:"32px", fontWeight:"bold"}}>1</p>
                                </div>
                                <MDBNavLink className="black-text" to="#!">
                                    <i style={{paddingTop:0, fontSize:24}} className="far fa-bell"></i>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="black-text" to="#!">Logout
                                </MDBNavLink>
                            </MDBNavItem>

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>

                <MDBRow className={"contentContainer"}>
                    <MDBCol size="2">
                        <MDBBtn color="blue" href="#">Add Veteranian</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"contentContainer"}>



                    <MDBCard style={{ width: "20%", margin: "20px" }}>
                        <MDBCardBody>
                            <MDBCardTitle>Eric Anthony</MDBCardTitle>
                            <MDBCardText small>
                                <p><span style={{fontWeight:"bold"}}>Joined</span>: 17/02/2020</p>
                            </MDBCardText>
                            <MDBCardText>
                                <p><span style={{fontWeight:"bold"}}>Certificate ID</span>: A129319239</p>
                            </MDBCardText>
                            <MDBCardText>
                                <p><span style={{fontWeight:"bold"}}>Day(s) of Duty</span>: Mon, Wed, Fri</p>
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
                            <MDBCardTitle>Eric Anthony</MDBCardTitle>
                            <MDBCardText small>
                                <p><span style={{fontWeight:"bold"}}>Joined</span>: 17/02/2020</p>
                            </MDBCardText>
                            <MDBCardText>
                                <p><span style={{fontWeight:"bold"}}>Certificate ID</span>: A129319239</p>
                            </MDBCardText>
                            <MDBCardText>
                                <p><span style={{fontWeight:"bold"}}>Day(s) of Duty</span>: Mon, Wed, Fri</p>
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
                            <MDBCardTitle>Eric Anthony</MDBCardTitle>
                            <MDBCardText small>
                                <p><span style={{fontWeight:"bold"}}>Joined</span>: 17/02/2020</p>
                            </MDBCardText>
                            <MDBCardText>
                                <p><span style={{fontWeight:"bold"}}>Certificate ID</span>: A129319239</p>
                            </MDBCardText>
                            <MDBCardText>
                                <p><span style={{fontWeight:"bold"}}>Day(s) of Duty</span>: Mon, Wed, Fri</p>
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

export default vetList
