import React from "react"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBFormInline,
    MDBIcon, MDBCardTitle, MDBCardText, MDBBtn, MDBCardBody, MDBCard
} from "mdbreact";
import Axios from "axios";
import {api_url_admin, api_url_clinic} from "../../global";
import {connect} from "react-redux";
import moment from "moment";

class appointmentHistory extends React.Component {
    state = {
        offset: 0,
        bookingData: []
    }

    componentDidMount() {
        Axios.post(`${api_url_clinic}clinicShowAllBookingAppointment`,{
            token: this.props.token,
            offset: this.state.offset
        }).then(bookingData => this.setState({bookingData}))
    }

    addOffset = () => this.state.bookingData ? this.setState({
        offset: this.state.offset + 1
    }, () => this.paginationBooking(this.state.offset + 10)) : null;

    removeOffset = () => this.state.offset > 0 ? this.setState({
        offset: this.state.offset - 1
    }, () => this.paginationBooking(this.state.offset - 10)) : null;

    paginationBooking = offset => {
        alert(offset)
        Axios.post(`${api_url_clinic}clinicShowAllBookingAppointment`, {
            token: this.props.token,
            offset: offset
        }).then(data => this.setState({
            vetData: data
        }, () => console.log(data)))
    }

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>
                <MDBRow className={"contentContainer"}>
                    <h2>Appointment History</h2>
                </MDBRow>
                {/*<div className={"calenderOverlay"}>*/}
                {/*    <MDBRow>*/}
                {/*        <MDBCol size="2">*/}
                {/*            <MDBIcon/>*/}
                {/*        </MDBCol>*/}
                {/*        <MDBCol size="6">February, 2020</MDBCol>*/}
                {/*        <MDBCol size="2"/>*/}
                {/*    </MDBRow>*/}
                {/*</div>*/}

                <MDBRow className={"contentContainer"}>
                    {
                        this.state.bookingData.map(({_id:id,vet,time,user}) =>
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
                    <MDBBtn onClick={this.removeOffset} disabled={this.state.offset === 0}>Prev</MDBBtn>
                    <p>{this.state.offset + 1}</p>
                    <MDBBtn onClick={this.addOffset} disabled={this.state.bookingData.length < 10}>Next</MDBBtn>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default connect(state => state.user)(appointmentHistory)
