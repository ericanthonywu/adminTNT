import React from "react";
import {connect} from "react-redux";
import {MDBContainer} from "mdbreact";

class ChatRoom extends React.PureComponent{

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>

            </MDBContainer>
        );
    }

}

export default connect(state => state.user)(ChatRoom)
