import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap';
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
      this.setState({ loading: true });
      console.log(selectedBlogId);
      FireStore
      .collection('blogs')
      .doc(selectedBlogId)
      .collection('posts')
      .add({ title, resume, htmlBody: postInHtml })
      .then((docRef) => {
        this.setState({ loading: false });
      })
      .catch(error => console.log(error));
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
              <InputGroup className="mb-4">
                <FormControl as="select" onChange={this.onBlogChange}>
                  <option>Selecione o blog</option>
                  {renderBlogOptions}
                </FormControl>
              </InputGroup>

              <InputGroup className="mb-4">
                <FormControl placeholder='Título do Artigo' type="text" value={title} onChange={this.onTitleChange} />
              </InputGroup>

              <InputGroup className="mb-4">
                <FormControl placeholder={'Resumo do artigo'} as="textarea" value={resume} onChange={this.onResumeChange} />
              </InputGroup>

              <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                placeholder={'Escreve o conteúdo do artigo aqui'}
                wrapperClassName="demo-wrapper"
                className="editor mb-4"
                editorClassName="demo-editor"
                />
              
              <Button key="submitbtn" onClick={this.onSubmit} variant="primary" syze="lg" block>
                Enviar
              </Button>
            </Col>
            <Col sm={4}>
              <iframe
                title={'Preview'}
                srcDoc={postInHtml}
                width={'100%'}
                height={'100%'} />
            </Col>
          </Row>
        </Container> 
      );
    }
}

export default NewPost;
