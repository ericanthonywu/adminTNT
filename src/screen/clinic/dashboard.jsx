import React from "react"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBFormInline,
    MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBCard
} from "mdbreact";

import Socket from 'socket.io-client'
import {api_url_clinic, backend_url} from "../../global";
import {connect} from "react-redux";
import Axios from "axios";
import moment from "moment";

class clinicDashboard extends React.Component {
    state = {
        appointmentOngoing: []
    }

    componentDidMount() {
        const socket = Socket(backend_url, {
            query: {
                id: this.props.id,
                client: 'clinic',
            },
        })

        Axios.post(`${api_url_clinic}clinicShowOngoingAppointment`, {
            token: this.props.token
        }).then(appointmentOngoing => this.setState({appointmentOngoing}))

    }

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>


                <MDBRow className={"contentContainer"}>
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.props.history.push("/appointmentHistory")} color="blue" href="#">Booking History</MDBBtn>
                    </MDBCol>
                </MDBRow>
                {/*<MDBRow className={"contentContainer"}>*/}
                {/*    <h2>Appointment Schedule</h2>*/}
                {/*    <MDBCol size="12">*/}
                {/*        <MDBFormInline waves>*/}
                {/*            <div className="md-form my-0">*/}
                {/*                <input className="form-control mr-sm-6" type="text" placeholder="Search appointment"*/}
                {/*                       aria-label="Search"/>*/}
                {/*            </div>*/}
                {/*        </MDBFormInline>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}
                <MDBRow className={"contentContainer"}>
                    <h3>Ongoing Appointment</h3>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    {
                        this.state.appointmentOngoing.map(({_id:id,vet,time,user}) =>
                            <MDBCol size="12">
                                <MDBCard className={"cardCustom"} style={{width: "100%", margin: "20px"}}>
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol size="6">
                                                <MDBCardTitle>{user.username}</MDBCardTitle>
                                            </MDBCol>
                                            <MDBCol size="6">
                                                <MDBCardText style={{textAlign: "right", fontSize: 50}}>{moment(time).format("DD/MM/YYYY HH:mm")}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBCardText style={{fontWeight: "bold"}}>Phone Number: &nbsp;
                                            <span style={{fontWeight: "normal"}}>{user.phoneNumber}</span>
                                        </MDBCardText>
                                        <MDBCardText style={{fontWeight: "bold"}}>Email: &nbsp;
                                            <span style={{fontWeight: "normal"}}>{user.email}</span>
                                        </MDBCardText>
                                        <MDBCardText style={{fontWeight: "bold"}}>Appointment with : &nbsp;
                                            <span style={{fontWeight: "normal"}}>{vet.username}</span>
                                        </MDBCardText>


                                        {/*<MDBBtn rounded color="success">Edit</MDBBtn>*/}
                                        <MDBBtn rounded color="danger">Cancel</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        )
                    }
                </MDBRow>
            </MDBContainer>
        );
    }

}

export default connect(state => state.user)(clinicDashboard)
