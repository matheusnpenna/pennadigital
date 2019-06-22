import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, Button, Container, Row } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import './styles.css';

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

    onBlogChange = (blogName) => {
      this.setState({ blogName });
    }

    onSubmit = (event) => {
      // event.target.value
      // event.preventDefault()

    }

    render() {
      const {
        title, 
        editorState
      } = this.state;
      return (
        <Container>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label>Blog</Form.Label>
              <Form.Control as="select" onChange={this.onBlogChange}>
                <option value="A">Apple</option>
                <option value="B">Banana</option>
                <option value="C">Cranberry</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Título do Artigo</Form.Label>
              <Form.Control type="text" value={title} onChange={this.onTitleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Resumo do artigo</Form.Label>
              <Form.Control as="textarea" value={title} onChange={this.onTitleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Conteúdo</Form.Label> 
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                className="editor"
                onEditorStateChange={this.onEditorStateChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Container> 
      );
    }
}

export default NewPost;
