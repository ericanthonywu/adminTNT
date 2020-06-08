import React from "react";
import {connect} from "react-redux";
// import SunEditor,{buttonList} from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import {Editor} from 'react-draft-wysiwyg';
// import {EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dante from "Dante2";
import Axios from "axios";
import {api_url_admin} from "../../../global";
import {Link} from "react-router-dom";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import moment from "moment";

class Blog extends React.Component {
    state = {
        blog: []
    }
    componentDidMount() {
        Axios.post(`${api_url_admin}getBlog`).then(blog => {
            this.setState({blog})
        })
    }

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>'
                <MDBRow className={"contentContainer"}>
                    <Link to={'blog/add'}><MDBBtn>Add Blog</MDBBtn></Link>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    <MDBCard className={"cardClinic"}>
                        <MDBCardBody>
                            <MDBCardTitle>Title Blog</MDBCardTitle>
                            <MDBCardText small>
                                Published on 14/2/2020 at 5pm<br/>
                                Expired on 24/2/2020 at 12am
                            </MDBCardText>
                            <MDBCardText>Blog excerpt (max 250 characters)
                            </MDBCardText>
                            <MDBRow>
                                <MDBCol size="4">
                                    <a href="#">Detail</a>
                                </MDBCol>
                                <MDBCol size="4">
                                    <a href="#">Edit</a>
                                </MDBCol>
                                <MDBCol size="5" style={{marginTop:12}}>
                                    <a href="#">Unpublish</a>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className={"cardClinic"}>
                        <MDBCardBody>
                            <MDBCardTitle>Title Blog</MDBCardTitle>
                            <MDBCardText small>
                                Published on 14/2/2020 at 5pm<br/>
                                Expired on 24/2/2020 at 12am
                            </MDBCardText>
                            <MDBCardText>Blog excerpt (max 250 characters)
                            </MDBCardText>
                            <MDBRow>
                                <MDBCol size="4">
                                    <a href="#">Detail</a>
                                </MDBCol>
                                <MDBCol size="4">
                                    <a href="#">Edit</a>
                                </MDBCol>
                                <MDBCol size="5" style={{marginTop:12}}>
                                    <a href="#">Unpublish</a>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className={"cardClinic"}>
                        <MDBCardBody>
                            <MDBCardTitle>Title Blog</MDBCardTitle>
                            <MDBCardText small>
                                Published on 14/2/2020 at 5pm<br/>
                                Expired on 24/2/2020 at 12am
                            </MDBCardText>
                            <MDBCardText>Blog excerpt (max 250 characters)
                            </MDBCardText>
                            <MDBRow>
                                <MDBCol size="4">
                                    <a href="#">Detail</a>
                                </MDBCol>
                                <MDBCol size="4">
                                    <a href="#">Edit</a>
                                </MDBCol>
                                <MDBCol size="5" style={{marginTop:12}}>
                                    <a href="#">Unpublish</a>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>







                </MDBRow>

                <MDBRow className={"contentContainer"}>
                    <MDBCol>

                    </MDBCol>
                </MDBRow>


            </MDBContainer>

        );
    }

}

export default connect(state => state.user)(Blog)
