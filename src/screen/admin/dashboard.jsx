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

class Dashboard extends React.Component {
    state = {
        modal: false,
        username: "",
        address: "",
        lat: "",
        long: "",
        email: "",
        password: "",
        confirm_password: "",
        clinic: [],
        offset: 0
    };

    toggle = () => this.setState({modal: !this.state.modal});

    handleChangeText = e => this.setState({
        [e.target.name]: e.target.value
    });

    addClinic = e => {
        e.preventDefault();
        const {confirm_password, lat, long, email, password, username, address} = this.state;

        if (!username) {
            return this.username.focus()
        }

        if (!email) {
            return this.email.focus()
        }

        if (!address) {
            return this.address.focus()
        }

        if (!lat) {
            return this.lat.focus()
        }

        if (!long) {
            return this.lat.focus()
        }

        if (!password) {
            return this.password.focus()
        }

        if (!confirm_password) {
            return this.confirm_password.focus()
        }

        if (confirm_password !== password) {
            toast.error("password isn't same as confirm password");
            return this.confirm_password.focus()
        }

        Axios.post(`${api_url_admin}addClinic`, {
            token: this.props.token,
            username,
            password,
            email,
            address,
            lat,
            long,
        }).then(({id}) => {
            toast.success("Clinic added");
            this.setState({
                modal: false,
                clinic: [...this.state.clinic, {
                    _id: id,
                    username: username,
                    createdAt: Date.now(),
                    vet: 0
                }]
            })
        })
            .catch(err => toast.error("Clinic already exist"))
    };

    componentDidMount() {
        Axios.post(`${api_url_admin}showClinic`, {
            token: this.props.token,
            offset: this.state.offset
        }).then(data => this.setState({
            clinic: data
        }))
    }

    addOffset = () => this.state.clinic ? this.setState({
        offset: this.state.offset + 1
    }, () => this.paginationClinic(this.state.offset + 8)) : null;

    removeOffset = () => this.state.offset > 0 ? this.setState({
        offset: this.state.offset - 1
    }, () => this.paginationClinic(this.state.offset - 8)) : null;

    paginationClinic = offset => {
        Axios.post(`${api_url_admin}showClinic`, {
            token: this.props.token,
            offset: offset
        }).then(data => this.setState({
            vetData: data
        }, () => console.log(data)))
    }

    username = React.createRef();
    email = React.createRef();
    password = React.createRef();
    confirm_password = React.createRef();
    address = React.createRef();
    lat = React.createRef();
    long = React.createRef();

    render() {

        return (
            <MDBContainer fluid className={"mainContainer"}>
                <MDBModal className={"modalForm"} isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Add Clinic Form</MDBModalHeader>
                    <form onSubmit={this.addClinic}>
                        <MDBModalBody>
                            <MDBInput validate inputRef={input => this.username = input}
                                      label={"username"} name={"username"} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.email = input} label={"email"} type={"email"}
                                      name={"email"} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.address = input} label={"address"}
                                      name={"address"} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.lat = input} label={"lat"}
                                      name={"lat"} onChange={this.handleChangeText}/>
                            <MDBInput validate inputRef={input => this.long = input} label={"long"}
                                      name={"long"} onChange={this.handleChangeText}/>
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
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.props.history.push("/vet")} color="blue" href="#">Add Vet</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"contentContainer"}>
                    {
                        this.state.clinic ?
                            this.state.clinic.map(({_id, username, createdAt, vet}) =>
                                <MDBCard className={"cardClinic"}>
                                    <MDBCardBody>
                                        <MDBCardTitle>{username}</MDBCardTitle>
                                        <MDBCardText small>
                                            {moment(createdAt).format("DD MMM YYYY")}
                                        </MDBCardText>
                                        <MDBCardText>
                                            Size: {vet} Veteranians
                                        </MDBCardText>
                                        <MDBBtn onClick={e => this.props.history.push(`detailClinic/${_id}`)}>View</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            )
                            :
                            <p> No Clinic </p>
                    }
                </MDBRow>
                <MDBRow center className={"contentContainer"}>
                    <MDBCol>
                        <MDBPagination className="mb-5">
                            <MDBPageItem disabled={this.state.offset <= 0}>
                                <MDBPageNav onClick={this.removeOffset} aria-label="Previous">
                                    <span aria-hidden="true">Previous</span>
                                </MDBPageNav>
                            </MDBPageItem>
                            <MDBPageItem active>
                                {this.state.offset}
                            </MDBPageItem>
                            <MDBPageItem disabled={this.state.clinic < 8}>
                                <MDBPageNav onClick={this.addOffset} aria-label="Previous">
                                    <span aria-hidden="true">Next</span>
                                </MDBPageNav>
                            </MDBPageItem>
                        </MDBPagination>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

}

export default connect(state => state.user, {logout})(Dashboard)
