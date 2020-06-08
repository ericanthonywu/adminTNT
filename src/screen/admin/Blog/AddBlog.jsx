import React from "react";
import {connect} from "react-redux";
import SunEditor from 'suneditor-react';
import plugins from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css';
// import {Editor} from 'react-draft-wysiwyg';
// import {EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Dante from "Dante2";
import {MDBBtn, MDBInput} from "mdbreact";
import {toast} from "react-toastify";
import Axios from "axios";
import {api_url_admin} from "../../../global";

class AddBlog extends React.Component {
    state = {
        content: '',
        title: ''
        // editorState: EditorState.createEmpty()
    }

    componentDidMount() {
        const localHTML = sessionStorage.getItem('html');
        if (localHTML) {
            this.setState({
                content: localHTML
            })
        }
    }

    handleHTML = html =>
        this.setState({
            content: html
        })


    handleTitle = ({target}) =>
        this.setState({
            title: target.value
        })

    addBlog = () => {
        const {title, content: html} = this.state
        if (!title || !html) {
            return toast.error('Title or content is empty')
        }

        Axios.post(`${api_url_admin}addBlog`, {token: this.props.token, html, title})
            .then(async () => {
                await toast.success("Blog added")
                await sessionStorage.removeItem('html')
                this.props.history.push("/blog")
            })
    }


    // editor = React.createRef()

    render() {
        return (
            <div style={{paddingTop: 100, margin: "auto", width: "75%"}}>
                <MDBInput onChange={this.handleTitle} label={'Enter the title here'}/>
                <SunEditor setOptions={{
                    callBackSave: html => sessionStorage.setItem('html', html),
                    height: 200,
                    plugins: plugins,
                    buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle', 'blockquote'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['fontColor', 'hiliteColor', 'textStyle'],
                        ['removeFormat'],
                        '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image', 'video', /** 'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                        ['fullScreen', 'showBlocks', 'codeView'],
                        ['preview', 'print'],
                        ['save', 'template']
                    ],
                }} onChange={this.handleHTML} setContents={this.state.content} autoFocus
                           placeholder={"Enter the blog here"}/>
                <MDBBtn onClick={this.addBlog} color={"dark-green"}>Add Blog</MDBBtn>

                {/*<Editor*/}
                {/*    editorState={this.state.editorState}*/}
                {/*    wrapperClassName="demo-wrapper"*/}
                {/*    editorClassName="demo-editor"*/}
                {/*    onEditorStateChange={editorState => this.setState(editorState, () => console.log(editorState))}*/}
                {/*/>*/}
                {/*<div style={{margin: 100, backgroundColor: "white"}}>*/}
                {/*<Dante onChange={editor => {*/}
                {/*    console.log('editor content: ', editor.emitSerializedOutput())*/}
                {/*}}*/}
                {/*       body_placeholder={'Write a great blog here! '}*/}
                {/*       style={{marginTop: 100}}/>*/}
                {/*</div>*/}

            </div>
        );
    }

}

export default connect(state => state.user)(AddBlog)
