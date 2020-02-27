import React from "react"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBFormInline,
    MDBIcon, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBCard
} from "mdbreact";
import Axios from "axios";
import {api_url_clinic} from "../../global";

class appointmentHistory extends React.Component {
    state = {
        offset: 0
    }

    componentDidMount() {
        Axios.post(`${api_url_clinic}clinicShowAllBookingAppointment`,{
            token: this.props.token,
            offset: this.state.offset
        }).then(data => {

        })
    }

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>
                <MDBRow className={"contentContainer"}>
                    <h2>Appointment History</h2>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    <h3>February, 1st 2020</h3>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    <MDBBtn rounded>Select Date</MDBBtn>
                </MDBRow>
                <div className={"calenderOverlay"}>
                    <MDBRow>
                        <MDBCol size="2">
                            <MDBIcon/>
                        </MDBCol>
                        <MDBCol size="6">February, 2020</MDBCol>
                        <MDBCol size="2"/>
                    </MDBRow>
                </div>

                <MDBRow className={"contentContainer"}>
                    <MDBCol size="12">
                        <MDBCard className={"cardCustom"} style={{width: "100%", margin: "20px"}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBCardTitle>PatientName</MDBCardTitle>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBCardText style={{textAlign: "right", fontSize: 50}}>11:30</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <MDBCardText style={{fontWeight: "bold"}}>Phone Number: &nbsp;
                                    <span style={{fontWeight: "normal"}}>+628128855250</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Email: &nbsp;
                                    <span style={{fontWeight: "normal"}}>eric@wu.com</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Pet Type: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Dog</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Description: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Lorem ipsum dolor sit amet Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content..</span>
                                </MDBCardText>


                                <MDBBtn rounded color="success">Edit</MDBBtn>
                                <MDBBtn rounded color="danger">Erase</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="12">
                        <MDBCard className={"cardCustom"} style={{width: "100%", margin: "20px"}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBCardTitle>PatientName</MDBCardTitle>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBCardText style={{textAlign: "right", fontSize: 50}}>11:30</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <MDBCardText style={{fontWeight: "bold"}}>Phone Number: &nbsp;
                                    <span style={{fontWeight: "normal"}}>+628128855250</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Email: &nbsp;
                                    <span style={{fontWeight: "normal"}}>eric@wu.com</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Pet Type: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Dog</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Description: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Lorem ipsum dolor sit amet Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content..</span>
                                </MDBCardText>


                                <MDBBtn rounded color="success">Edit</MDBBtn>
                                <MDBBtn rounded color="danger">Erase</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="12">
                        <MDBCard className={"cardCustom"} style={{width: "100%", margin: "20px"}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBCardTitle>PatientName</MDBCardTitle>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBCardText style={{textAlign: "right", fontSize: 50}}>11:30</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <MDBCardText style={{fontWeight: "bold"}}>Phone Number: &nbsp;
                                    <span style={{fontWeight: "normal"}}>+628128855250</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Email: &nbsp;
                                    <span style={{fontWeight: "normal"}}>eric@wu.com</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Pet Type: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Dog</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Description: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Lorem ipsum dolor sit amet Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content..</span>
                                </MDBCardText>


                                <MDBBtn rounded color="success">Edit</MDBBtn>
                                <MDBBtn rounded color="danger">Erase</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol size="12">
                        <MDBCard className={"cardCustom"} style={{width: "100%", margin: "20px"}}>
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <MDBCardTitle>PatientName</MDBCardTitle>
                                    </MDBCol>
                                    <MDBCol size="6">
                                        <MDBCardText style={{textAlign: "right", fontSize: 50}}>11:30</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <MDBCardText style={{fontWeight: "bold"}}>Phone Number: &nbsp;
                                    <span style={{fontWeight: "normal"}}>+628128855250</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Email: &nbsp;
                                    <span style={{fontWeight: "normal"}}>eric@wu.com</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Pet Type: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Dog</span>
                                </MDBCardText>
                                <MDBCardText style={{fontWeight: "bold"}}>Description: &nbsp;
                                    <span style={{fontWeight: "normal"}}>Lorem ipsum dolor sit amet Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content..</span>
                                </MDBCardText>


                                <MDBBtn rounded color="success">Edit</MDBBtn>
                                <MDBBtn rounded color="danger">Erase</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default appointmentHistory
