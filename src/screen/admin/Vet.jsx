import React from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBBtn,
    MDBInput,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBModal,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBPagination, MDBPageItem, MDBPageNav
} from "mdbreact";
import {api_url_admin, backend_url, defaultProfile} from "../../global";
import moment from "moment";
import Axios from "axios";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import Swal from 'sweetalert'

class Vet extends React.Component {
    state = {
        cert_id: "",
        KTP: "",
        vet_name: "",
        vet_email: "",
        expYear: "",
        address: "",
        password: "",
        lat: "",
        long: "",
        modal: false,
        offset: 0,
        realOffset: 0,
        vetData: [],
        editState: {}
    }

    addOffset = () => this.state.vetData ? this.setState({
        offset: this.state.offset + 1,
        realOffset: this.state.realOffset + 8,
    }, this.paginationVet) : null;

    removeOffset = () => this.state.offset > 0 ? this.setState({
        offset: this.state.offset - 1,
        realOffset: this.state.realOffset - 8
    }, this.paginationVet) : null;

    paginationVet = () => {
        Axios.post(`${api_url_admin}showAllVet`, {
            token: this.props.token,
            offset: this.state.realOffset
        }).then(data => this.setState({
            vetData: data
        }, () => console.log(data)))
    }

    componentDidMount() {
        Axios.post(`${api_url_admin}showAllVet`, {
            token: this.props.token,
        }).then(data => this.setState({
            vetData: data
        }, () => console.log(data)))

    }

    handleChange = e => {
        const {name, value} = e.target
        switch (name) {
            case "expYear":
                const min = 0,
                    max = new Date().getFullYear();

                if (value < min) {
                    e.target.value = min
                    return false
                }

                if (value > max) {
                    e.target.value = max
                    return false
                }
                break;
        }
        this.setState({
            [name]: value
        })
    }

    toggle = () => this.setState({modal: !this.state.modal})

    addVet = e => {
        e.preventDefault()
        const {cert_id, KTP, vet_name, vet_email, expYear, address, password, lat, long} = this.state
        // if (cert_id && KTP && vet_email && vet_name && expYear && address && password && lat && long) {
            Axios.post(`${api_url_admin}addVet`, {
                token: this.props.token,
                cert_id: cert_id,
                KTP: KTP,
                vet_name: vet_name,
                vet_email: vet_email,
                expYear: expYear,
                address: address,
                password: password,
                lat: lat,
                long: long
            }).then(({id}) =>
                this.setState({
                    vetData: [...this.state.vetData, {
                        _id: id,
                        promoted: false,
                        profile_picture: "default.png",
                        username: vet_name,
                        KTP: KTP,
                        email: vet_email,
                        createdAt: Date.now(),
                        cert_id,
                        ban: false,
                        session: {
                            coordinates: [long, lat]
                        }
                    }],
                    modal: false
                }, () => toast.success(`Vet ${vet_name} added`))
            ).catch(err => {
                if (err.status === 400) {
                    toast.warn(err.data.msg)
                }
            })
        // } else {
        //     toast.warn("Input not yet filled")
        // }
    }

    ban = (id, index, ban) => {
        Swal({
            title: "Are you sure?",
            text: `This vet will be banned`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    Axios.post(`${api_url_admin}banVetClinic`, {
                        token: this.props.token,
                        vetId: id,
                        ban: !ban
                    }).then(() => {
                        const {vetData} = this.state
                        vetData[index].ban = !ban
                        this.setState({
                            vetData: vetData
                        })
                        toast.success("Vet banned")
                    })
                }
            })
    }

    render() {
        return (
            <>
                <MDBContainer fluid className={"mainContainer"}>
                    <MDBModal className={"modalForm"} isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Add Vet to My Clinic</MDBModalHeader>
                        <form onSubmit={this.addVet}>
                            <MDBModalBody>

                                <label className="grey-text">
                                    Certificate ID
                                </label>
                                <input name={"cert_id"} onChange={this.handleChange} type="text"
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Citizenship ID (No. KTP)
                                </label>
                                <input name={"KTP"} type="text" onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Veteranian Name
                                </label>
                                <input name={"vet_name"} type="text" onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Email
                                </label>
                                <input name={"vet_email"} type="text" onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    First year work experience
                                </label>
                                <input name={"expYear"} type={"number"} min={0} max={new Date().getFullYear()}
                                       onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <MDBInput type="textarea" name={"address"} label="Address" onChange={this.handleChange}
                                          outline/>
                                <br/>
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Password
                                </label>
                                <input name={"password"} onChange={this.handleChange} type="password"
                                       id="defaultFormLoginPasswordEx" className="form-control"/>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggle}>Cancel</MDBBtn>
                                <MDBBtn type={"submit"} color="indigo">Add</MDBBtn>
                            </MDBModalFooter>
                        </form>
                    </MDBModal>
                    <MDBRow className={"contentContainer"}>

                        <MDBCol size="2">
                            <MDBBtn type={"button"} color={"blue"} onClick={() => this.props.history.push("/dashboard")}> back </MDBBtn>
                        </MDBCol>
                        <MDBCol size="2">
                            <MDBBtn type={"button"} color={"blue"} onClick={() => this.setState({
                                modal: true
                            })}> add Vet </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={"contentContainer"}>
                        {
                            this.state.vetData ?
                                this.state.vetData.map(({username, profile_picture, promoted, email, cert_id, KTP, session, ban, _id, createdAt, expYear}, idx) =>
                                    <MDBCard className={"cardClinic"}>
                                        <MDBCardBody>
                                            <MDBCardTitle>{username}</MDBCardTitle>
                                            <MDBCardText small className={"text-center"}>
                                                <img
                                                    src={profile_picture === "default.png" ? defaultProfile : `${backend_url}uploads/vet/${profile_picture}`}
                                                    width={60}/>
                                            </MDBCardText>
                                            <MDBCardText small>
                                                Promoted: {promoted.toString()}
                                            </MDBCardText>
                                            <MDBCardText small>
                                                Email Address: <a href={`mailto:${email}`}
                                                                  target={"_blank"}> {email} </a>
                                            </MDBCardText>
                                            <MDBCardText small>
                                                Cert ID: {cert_id}
                                            </MDBCardText>
                                            <MDBCardText small>
                                                Experience : {new Date().getFullYear() - expYear} Year(s)
                                            </MDBCardText>
                                            <MDBCardText small>
                                                No. KTP: {KTP}
                                            </MDBCardText>
                                            <MDBCardText small>
                                                Location: <a target={"_blank"}
                                                             href={`http://maps.google.com/maps?z=12&t=m&q=loc:${session.coordinates[1]}+-${session.coordinates[0]}`}>see
                                                on google maps</a>
                                            </MDBCardText>
                                            <MDBCardText small>
                                                {moment(createdAt).format("DD MMM YYYY")}
                                            </MDBCardText>
                                            <MDBBtn onClick={() => this.props.history.push(`vet/${_id}`)}>Edit</MDBBtn>
                                            <MDBBtn onClick={() => this.ban(_id, idx, ban)}
                                                    color={"danger"}>{ban ? "unban" : "ban"}</MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                )
                                :
                                <p> No Vet </p>
                        }
                    </MDBRow>
                    <MDBRow center className={"contentContainer"}>
                        <MDBCol>
                            <MDBPagination className="mb-5">
                                <MDBPageItem disabled={this.state.offset <= 0}>
                                    <MDBPageNav aria-label="Previous" onClick={this.removeOffset}>
                                        <span aria-hidden="true">Previous</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem>
                                    <MDBPageNav>
                                        <MDBInput value={this.state.offset}/> <span className="sr-only">(current)</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                                <MDBPageItem disabled={this.state.vetData.length < 8}>
                                    <MDBPageNav aria-label="Next" onClick={this.addOffset}>
                                        <span aria-hidden="true">Next</span>
                                    </MDBPageNav>
                                </MDBPageItem>
                            </MDBPagination>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }

}

export default connect(state => state.user)(Vet)
