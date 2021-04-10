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
        offset: 0,
        currentOffset: 0,
        image: [],
        file: []
    };

    toggle = () => this.setState({modal: !this.state.modal});

    handleChangeText = e =>
        this.setState({
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
            return this.long.focus()
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

        const formdata = new FormData()
        formdata.append("username", username)
        formdata.append("email", email)
        formdata.append("password", password)
        formdata.append("address", address)
        formdata.append("lat", lat)
        formdata.append("long", long)

        for (let i = 0; i < this.state.file.length; i++) {
            formdata.append('image', this.state.file[i])
        }

        Axios.post(`${api_url_admin}addClinic`, formdata).then(({id}) => {
            toast.success("Clinic added")

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
    };

    componentDidMount() {
        Axios.post(`${api_url_admin}showClinic`, {
            offset: this.state.offset
        }).then(clinic => {
            this.setState({clinic})
        })
    }

    addOffset = () => this.state.clinic
        ? // if
        this.setState({
            offset: this.state.offset + 1,
            currentOffset: this.state.currentOffset + 8
        }, this.paginationClinic)
        : // else
        null;

    removeOffset = () => this.state.offset > 0
        ? // if
        this.setState({
            offset: this.state.offset - 1,
            currentOffset: this.state.currentOffset - 8
        }, this.paginationClinic)
        : // else
        null;

    paginationClinic = () =>
        Axios.post(`${api_url_admin}showClinic`, {
            token: this.props.token,
            offset: this.state.currentOffset
        }).then(vetData => this.setState({vetData}))


    uploadFile = e => {
        if (e.target.files.length) { //cek file
            // const files = Array.from(e.target.files); //get files array
            this.setState({
                file: e.target.files
            });
            // Promise.all(files.map(file => //mapping files
            //     new Promise((resolve, reject) => {
            //         const reader = new FileReader();
            //         reader.addEventListener('load', e => {
            //             resolve(e.target.result); //return images
            //         });
            //         reader.addEventListener('error', reject); //put error handler
            //         reader.readAsDataURL(file);
            //     })
            // ))
            //     .then(image => this.setState({image}))
            //     .catch(err => toast.error(`Error happened with data : ${JSON.stringify(err)}`));
        }
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
                            <MDBInput validate type={"file"} onChange={this.uploadFile} multiple accept={'.jpg,.jpeg,.png,.pneg'}/>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn type={"submit"} color="primary">Submit</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModal>

                <MDBRow className={"contentContainer"}>
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.setState({modal: true})} color="blue">Add Clinic</MDBBtn>
                    </MDBCol>
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.props.history.push("/vet")} color="blue">Add Vet</MDBBtn>
                    </MDBCol>
                    <MDBCol size="2">
                        <MDBBtn onClick={() => this.props.history.push("/blog")} color="blue">Add Blog</MDBBtn>
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
                                        <MDBBtn
                                            onClick={() => this.props.history.push(`detailClinic/${_id}`)}>View</MDBBtn>
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
