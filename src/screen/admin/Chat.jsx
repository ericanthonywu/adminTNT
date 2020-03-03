import React from "react"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCardBody,
    MDBCard,
    MDBModal,
    MDBModalHeader,
    MDBPagination,
    MDBPageItem,
    MDBPageNav,

    MDBModalBody, MDBModalFooter, MDBInput
} from "mdbreact";
import {toast} from "react-toastify";
import Axios from "axios";
import {api_url_admin} from "../../global";
import {connect} from "react-redux";
import {logout} from "../../redux/actions";
import moment from "moment";


class Chat extends React.PureComponent{

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>
                <MDBRow style={{marginTop:20}}>
                    <MDBCol size="1"></MDBCol>
                    <MDBCol className={"chatWrapper"} size="10">
                        <MDBRow>
                            <MDBCol size="4" className={"chatContactWrapper"}>
                                <h2 style={{marginBottom:24}}>Customer Chat</h2>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>
                                <div className={"chatItem"}>
                                    <p style={{marginBottom:5}}><strong>contactName</strong></p>
                                    <p style={{marginBottom:5}}>chatPreview</p>
                                    <p style={{fontSize:12, fontStyle:"italic"}}>chatDate</p>
                                </div>

                            </MDBCol>
                            <MDBCol size="8">
                                <div className={"contactDetail"}>
                                    <p style={{marginBottom:5, fontSize:18}}><strong>contactName</strong></p>
                                </div>
                                <div className={"chatRoomWrapper"}>
                                    <div className={"chatBubble"}>
                                        <p>asdasd</p>
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol size="1"/>
                </MDBRow>
            </MDBContainer>
        );
    }

}

export default connect(state => state.user)(Chat)
