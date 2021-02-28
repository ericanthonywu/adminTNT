import React from "react";
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBCardTitle,
    MDBCol,
    MDBContainer, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem, MDBNavLink, MDBRow
} from "mdbreact";
import Axios from "axios";
import {api_url_clinic, backend_url, defaultProfile, globalErrorHandlers} from "../../global";
import {connect} from "react-redux";
import swal from "sweetalert";
import {toast} from "react-toastify";
import moment from "moment";

class vetList extends React.Component {
    state = {
        offset: 0,
        modal: false,
        vetList: [],
        clinicVet: []
    }

    componentDidMount() {
        Axios.post(`${api_url_clinic}showVetClinic`, {
            offset: this.state.offset
        }).then(clinicVet => this.setState({clinicVet}))
    }

    search = e => {
        // if(e.target.value.length > 3) {
        Axios.post(`${api_url_clinic}searchVetClinic`, {
            keyword: e.target.value
        }).then(data => {
            this.setState({
                vetList: data
            })
        })
        // }
    }

    addVet = (id, username, id_cert) => {
        swal({
            title: "Are you sure?",
            text: `Vet ${username} will be added to your clinic list`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.post(`${api_url_clinic}addVetClinic`, {
                        token: this.props.token,
                        vetId: id
                    }).then(() => {
                        toast.success(`Poof! Vet ${username} has been added to your clinic!`)
                        const {clinicVet} = this.state
                        clinicVet.push(({
                            id,
                            username,
                            id_cert,
                            createdAt: Date.now()
                        }))
                        this.setState({
                            modal: false,
                            clinicVet: clinicVet
                        })
                    }).catch(err => {
                        if(err.status === 409){
                            toast.error("Oops! You already had this vet")
                        }
                    })
                }
            });
    }

    toggle = () => this.setState({modal: !this.state.modal})

    render() {
        return (
            <MDBContainer fluid className={"mainContainer"}>
                <MDBModal className={"modalForm"} isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Add Vet to My Clinic</MDBModalHeader>
                    <form onSubmit={this.addClinic}>
                        <MDBModalBody>
                            <MDBInput type={"search"} label={"Search vet to add"} onChange={this.search}/>
                            <div style={{cursor:"pointer"}}>
                                {
                                    this.state.vetList.map(({_id, username, profile_picture, id_cert}) =>
                                        <div onClick={() => this.addVet(_id, username, id_cert)}><img
                                            alt={`${username}'s photo`}
                                            src={profile_picture === "default.png" ? defaultProfile : `${backend_url}uploads/vet/${profile_picture}`}/>{username}
                                        </div>
                                    )
                                }
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>
                <MDBRow className={"contentContainer"}>
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.setState({modal: true})} color="blue" href="#">Add
                            Veteranian</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    {
                        this.state.clinicVet ?
                            this.state.clinicVet.map(data =>
                                <MDBCard style={{width: "20%", margin: "20px"}}>
                                    <MDBCardBody>
                                        <MDBCardTitle>{data.username}</MDBCardTitle>
                                        <MDBCardText small>
                                            <p><span style={{fontWeight: "bold"}}>Joined</span>: {moment(data.createdAt).format("DD/MM/YYYY")}</p>
                                        </MDBCardText>
                                        <MDBCardText>
                                            <p><span style={{fontWeight: "bold"}}>Certificate ID</span>: {data.cert_id}</p>
                                        </MDBCardText>
                                        {/*<MDBCardText>*/}
                                        {/*    <p><span style={{fontWeight: "bold"}}>Day(s) of Duty</span>: Mon, Wed, Fri</p>*/}
                                        {/*</MDBCardText>*/}
                                        {/*<MDBBtn href="#">View</MDBBtn>*/}
                                    </MDBCardBody>
                                </MDBCard>
                            )
                            :
                            <p>404 not found</p>
                    }

                </MDBRow>
            </MDBContainer>
        );
    }
}

export default connect(state => state.user)(vetList)
