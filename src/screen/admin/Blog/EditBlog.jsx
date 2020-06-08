import React from "react";
import {connect} from "react-redux";
// import SunEditor,{buttonList} from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
// import {Editor} from 'react-draft-wysiwyg';
// import {EditorState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Dante from "Dante2";

class EditBlog extends React.Component {
    state = {
        content: '',
        // editorState: EditorState.createEmpty()
    }


    // editor = React.createRef()

    render() {
        return (
            <div style={{paddingTop: 100, margin:"auto", width:"75%"}}>
                {/*<SunEditor setOptions={{*/}
                {/*    height: 200,*/}
                {/*    buttonList: buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]*/}
                {/*    // Other option*/}
                {/*}}  autoFocus placeholder={"Enter the blog here"}/>*/}

                {/*<Editor*/}
                {/*    editorState={this.state.editorState}*/}
                {/*    wrapperClassName="demo-wrapper"*/}
                {/*    editorClassName="demo-editor"*/}
                {/*    onEditorStateChange={editorState => this.setState(editorState, () => console.log(editorState))}*/}
                {/*/>*/}
                <div style={{margin: 100,backgroundColor:"white"}}><Dante style={{marginTop:100}} /></div>

            </div>
        );
    }

}

export default connect(state => state.user)(EditBlog)
