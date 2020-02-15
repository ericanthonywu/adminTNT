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
    MDBModalBody, MDBModalFooter, MDBInput
} from "mdbreact";
import {toast} from "react-toastify";
import Axios from "axios";
import {api_url_admin} from "../../global";
import {connect} from "react-redux";

class Dashboard extends React.Component {
    state = {
        modal: false,
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    toggle = () => this.setState({modal: !this.state.modal})

    handleChangeText = e => this.setState({
        [e.target.name]: e.target.value
    })

    addClinic = e => {
        e.preventDefault()
        const {confirm_password, email, password, username} = this.state

        if (!username) {
            return this.username.focus()
        }

        if (!email) {
            return this.email.focus()
        }

        if (!password) {
            return this.password.focus()
        }

        if (!confirm_password) {
            return this.confirm_password.focus()
        }

        if (confirm_password !== password) {
            toast.error("password isn't same as confirm password")
            return this.confirm_password.focus()
        }

        Axios.post(`${api_url_admin}addClinic`,{
            token: this.props.token,
            username: username,
            password: password,
            email: email
        }).then(() => toast.success("Clinic added")).catch(err => {
            if(!err.response){
                return toast.error("No Connection")
            }
            toast.error("Clinic failed added")
        })
    }

    username = React.createRef()
    email = React.createRef()
    password = React.createRef()
    confirm_password = React.createRef()

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Add Clinic Form</MDBModalHeader>
                    <form onSubmit={this.addClinic}>
                        <MDBModalBody>
                            <MDBInput validate inputRef={input => this.username = input}
                                      label={"username"} name={"username"} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.email = input} label={"email"} type={"email"}
                                      name={"email"} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.password = input} label={"password"}
                                      type={"password"} name={"password"}
                                      onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.confirm_password = input}
                                      label={"confirm password"} type={"password"} name={"confirm_password"}
                                      onChange={this.handleChangeText}/>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn type={"submit"} color="primary">Submit</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBRow className={"contentContainer"}>
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.setState({modal: true})} color="blue" href="#">Add Clinic</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    <MDBCard style={{width: "20%", margin: "20px"}}>
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

                    <MDBCard style={{width: "20%", margin: "20px"}}>
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

                    <MDBCard style={{width: "20%", margin: "20px"}}>
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

                    <MDBCard style={{width: "20%", margin: "20px"}}>
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

export default connect(state => state.user)(Dashboard)
