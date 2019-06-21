import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import logo from '../../logo.svg';
import './styles.css';

class NewPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        editorState: EditorState.createEmpty(), // ContentState JSON
      };
    }

    onEditorStateChange = (editorState) => {
      console.log(editorState.getCurrentContent());
      this.setState({
        editorState,
      });
    };

    onTitleChange = (title) => {
      this.setState({ title });
    }

    onSubmit = () => {

    }

    render() {
      const {
        title, 
        editorState
      } = this.state;
      return (
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <select value={title} onChange={this.onTitleChange}>
              <option value="A">Apple</option>
              <option value="B">Banana</option>
              <option value="C">Cranberry</option>
            </select>
            <input value={title} onChange={this.onTitleChange} />
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
              />
            <input type="submit" value="Enviar" />
          </form>
        </div> 
      );
    }
}

export default NewPost;
