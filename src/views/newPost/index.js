import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

import { FireStore } from '../../config';

// import './styles.css';

class NewPost extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        selectedBlogId: '',
        resume: '',
        editorState: EditorState.createEmpty(),
        blogs: [],
        postInHtml: ''
      };

      FireStore
          .collection("blogs")
          .get()
          .then(querySnapShot => {
            const blogs = [];
            querySnapShot.forEach((doc) => blogs.push({ id: doc.id, name: doc.data().name }));
            this.setState({ blogs })
          })
    }

    onEditorStateChange = (editorState) => {
      const raw = editorState.getCurrentContent();
      const postInHtml = stateToHTML(raw); 
      console.log(postInHtml);
      this.setState({
        editorState,
        postInHtml
      });
    };

    onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    }

    onBlogChange = (event) => {
      this.setState({ selectedBlogId: event.target.value });
    }

    onResumeChange = (event) => {
      this.setState({ resume: event.target.value });
    }

    onSubmit = (event) => {
      const {
        title,
        resume,
        postBody,
        selectedBlogId,
        postInHtml
      } = this.state;
      FireStore
      .collection('blogs')
      .doc(selectedBlogId)
      .collection('posts')
      .add({ title, resume, htmlBody: postInHtml });
    }

    render() {
      const {
        title,
        resume,
        blogs, 
        editorState,
        postInHtml
      } = this.state;

      const renderBlogOptions = blogs.map(
        blog => <option key={blog.id} value={blog.id}>{blog.name}</option>
      );

      return (
        <Container>
          <Row>
            <Col sm={8}>
              <Form onSubmit={this.onSubmit}>
                <Form.Group>
                  <Form.Label>Blog</Form.Label>
                  <Form.Control as="select" onChange={this.onBlogChange}>
                    {renderBlogOptions}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Título do Artigo</Form.Label>
                  <Form.Control type="text" value={title} onChange={this.onTitleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Resumo do artigo</Form.Label>
                  <Form.Control as="textarea" value={resume} onChange={this.onResumeChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Conteúdo</Form.Label> 
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder={'Escreve o conteúdo do artigo aqui'}
                    wrapperClassName="demo-wrapper"
                    className="editor"
                    editorClassName="demo-editor"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>
            <Col sm={4}>
              <iframe srcDoc={postInHtml} width={'100%'} height={'100%'}>
              </iframe>
            </Col>
          </Row>
        </Container> 
      );
    }
}

export default NewPost;
