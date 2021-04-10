import React from "react";
import {connect} from "react-redux";
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBRow
} from "mdbreact";
import Axios from "axios";
import {api_url_admin} from "../../global";
import Error404 from "../Error404";

class EditVet extends React.Component {

    state = {
        data: {session: {coordinates: []}},
        notFound: false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        if (!id.match(/^[0-9a-z]+$/)) {
            return this.setState({
                notFound: true
            })
        }
        Axios.post(`${api_url_admin}detailVet`, {
            token: this.props.token,
            vetId: id
        }).then(data => {
            if (!data) {
                this.setState({
                    notFound: true
                })
            }else{
                console.log(data)
                this.setState({
                    data
                })
            }
        }).catch(response => {
            if (response.status === 404 || response.status === 500) {
                this.setState({
                    notFound: true
                })
            }
        })
    }

    editVet = e => {
        e.preventDefault()

        alert(this.state.data.address)
        Axios.post(`${api_url_admin}editVet`,{
            token: this.props.token,
            ...this.state.data
        }).then(() => this.props.history.push("/vet"))
    }

    handleChange = e => {
        const {name, value} = e.target

        switch (name) {
            case "long":
                return this.setState({
                    data: {
                        ...this.state.data,
                        session: {coordinates: [parseInt(value), this.state.data.session.coordinates ? this.state.data.session.coordinates[1] : null]}
                    }
                })
            case "lat":
                return this.setState({
                    data: {
                        ...this.state.data,
                        session: {coordinates: [this.state.data.session.coordinates ? this.state.data.session.coordinates[0] : null, parseInt(value)]}
                    }
                })

        }
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        })
    }

    render() {
        if (this.state.notFound) {
            return <Error404/>
        }
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg={8} md={6} middle>
                        <h1>Edit Vet</h1>
                        <form onSubmit={this.editVet} autoComplete={"off"}>
                            <MDBModalBody>

                                <label className="grey-text">
                                    Certificate ID
                                </label>
                                <input value={this.state.data.cert_id} name={"cert_id"} onChange={this.handleChange}
                                       type="text"
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Citizenship ID (No. KTP)
                                </label>
                                <input name={"KTP"} value={this.state.data.KTP} type="text" onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Veteranian Name
                                </label>
                                <input name={"username"} value={this.state.data.username} type="text"
                                       onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Email
                                </label>
                                <input name={"email"} value={this.state.data.email} type="text"
                                       onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    Experience year
                                </label>
                                <input name={"expYear"} type={"number"} value={this.state.data.expYear} min={0}
                                       max={new Date().getFullYear()}
                                       onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <MDBInput type="textarea" value={this.state.data.address} name={"address"}
                                          label="Address" onChange={this.handleChange}
                                          outline/>
                                <br/>
                                <label className="grey-text">
                                    Lat
                                </label>
                                <input name={"lat"} value={this.state.data.session.coordinates ? this.state.data.session.coordinates[1] : ""} onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label className="grey-text">
                                    long
                                </label>
                                <input name={"long"} value={this.state.data.session.coordinates ? this.state.data.session.coordinates[0] : ""} onChange={this.handleChange}
                                       className="form-control"/>
                                <br/>
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Password
                                </label>
                                <input name={"password"} onChange={this.handleChange} type="password"
                                       id="defaultFormLoginPasswordEx" className="form-control"/>
                            </MDBModalBody>

                            <MDBBtn type={"submit"} color="indigo">Edit</MDBBtn>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

}

export default connect(state => state.user)(EditVet)
