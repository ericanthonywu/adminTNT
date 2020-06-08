import React from "react"
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTableBody,
    MDBTableHead,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCardBody,
    MDBCard,
    MDBTable,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBInput,
    MDBModalFooter
} from "mdbreact";
import Axios from "axios";
import {api_url_admin, backend_url} from "../../global";
import {connect} from "react-redux";
import Error404 from "../Error404";
import swal from "sweetalert";
import moment from "moment";
import {toast} from "react-toastify";

class DetailClinic extends React.Component {
    state = {
        notFound: false,
        clinic: {vet: [], photo:[], session: {coordinates: []}},
        modal: false
    }

    componentDidMount() {
        const {clinicId} = this.props.match.params;
        if (!clinicId.match(/^[0-9a-z]+$/)) {
            return this.setState({
                notFound: true
            })
        }

        Axios.post(`${api_url_admin}detailClinic`, {
            token: this.props.token,
            clinicId: clinicId
        }).then(data =>
            this.setState({
                clinic: data
            })
        ).catch(err => {
            if (err.status === 404) {
                this.setState({
                    notFound: true
                })
            }
        })
    }

    editClinic = e => {
        e.preventDefault()
        Axios.post(`${api_url_admin}editClinic`, {
            token: this.props.token,
            ...this.state.clinic
        }).then(() => this.props.history.push("/dashboard"))
    }

    delete = () => {
        const {clinicId} = this.props.match.params;
        swal({
            title: "Are you sure?",
            text: `This clinic will be deleted`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.post(`${api_url_admin}deleteClinic`, {
                        token: this.props.token,
                        clinicId
                    }).then(() => {
                        toast.success("Clinic deleted");
                        this.props.history.push("/dashboard")
                    })
                }
            })
            .catch(err => toast.error(`error with ${JSON.stringify(err)}`))
    }

    toggle = () => this.setState({modal: !this.state.modal})

    handleChangeText = e => {
        const {name, value} = e.target
        // eslint-disable-next-line default-case
        switch (name) {
            case "long":
                return this.setState({
                    clinic: {
                        ...this.state.clinic,
                        session: {coordinates: [value, this.state.clinic.session.coordinates[1]]}
                    }
                })
            case "lat":
                return this.setState({
                    clinic: {
                        ...this.state.clinic,
                        session: {coordinates: [this.state.clinic.session.coordinates[0], value]}
                    }
                })
        }
        this.setState({
            clinic: {
                ...this.state.clinic,
                [name]: value
            }
        })
    }


    render() {

        return (
            <MDBContainer fluid className={"mainContainer"}>

                <MDBModal className={"modalForm"} isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Edit Clinic Form</MDBModalHeader>
                    <form onSubmit={this.editClinic}>
                        <MDBModalBody>
                            <MDBInput validate inputRef={input => this.username = input}
                                      label={"username"} value={this.state.clinic.username} name={"username"}
                                      onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.email = input} label={"email"} type={"email"}
                                      name={"email"} value={this.state.clinic.email} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.address = input} label={"address"}
                                      name={"address"} value={this.state.clinic.address}
                                      onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.lat = input} label={"lat"}
                                      name={"lat"} value={this.state.clinic.session.coordinates[1]}
                                      onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.long = input} label={"long"}
                                      name={"long"} value={this.state.clinic.session.coordinates[0]}
                                      onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.password = input} label={"password"}
                                      name={"password"}
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
                        <MDBBtn color="unique" onClick={e => this.props.history.goBack()}>Back</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    <MDBCard style={{width: "100%", margin: "20px"}}>
                        <MDBCardBody>
                            <MDBCardTitle>Clinic {this.state.clinic.username}</MDBCardTitle>
                            <MDBCardText small>
                                {moment(this.state.clinic.createdAt).format("DD/MM/YYYY")}
                            </MDBCardText>
                            <MDBCardText>
                                Size: <span
                                className="font-weight-bold">{this.state.clinic.vet.length}</span> Veteranians
                            </MDBCardText>
                            <MDBCardText>
                                Location: <span className="font-weight-bold">{this.state.clinic.address}</span>
                            </MDBCardText>
                            <MDBCardText>
                                Image: <br/>
                                {this.state.clinic.photo.map(photo => <img src={`${backend_url}uploads/clinic/${photo}`} width={100} height={100} alt={photo}/>)}
                            </MDBCardText>
                            <MDBTable>
                                <MDBTableHead>
                                    <tr>
                                        <th>Certificate ID</th>
                                        <th>Full Name</th>
                                        <th>Date Joined</th>
                                        <th>Experience</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {
                                        this.state.clinic.vet.map(({cert_id, username, createdAt, expYear}) =>
                                            <tr>
                                                <td>{cert_id}</td>
                                                <td>{username}</td>
                                                <td>{moment(createdAt).format("DD/MM/YYYY")}</td>
                                                <td>{new Date().getFullYear() - expYear} year(s)</td>
                                            </tr>
                                        )
                                    }
                                </MDBTableBody>
                            </MDBTable>
                            <MDBBtn onClick={e => this.setState({modal: true})} rounded color="success">Edit</MDBBtn>
                            <MDBBtn rounded color="danger" onClick={this.delete}>Erase</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                </MDBRow>


            </MDBContainer>
        );
    }

}

export default connect(state => state.user)(DetailClinic)
