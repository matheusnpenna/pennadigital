import React from 'react';
import {
  InputGroup,
  FormControl,
  Image,
  Button,
  Container,
  Col,
  Spinner,
  Alert
} from 'react-bootstrap';
import { Auth } from '../../services';
import { assets } from '../../config';
import './styles.css';

class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {visible: false, message: ''},
      loading: false
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  attemptLogin = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    Auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ loading: false }, () => this.props.history.push('/'))
    })
    .catch((error) => {
      this.setState({ 
          error: {
            visible: true,
            message:`Error ${error.code} - ${error.message}` },
          loading: false
      });
    });

  }
    render() {
      const { email, password, error, loading } = this.state;
    
      return (
        <Container className="container" >
            <InputGroup className="custom-input-group">
               <Col className="col-center">
                  <Image src={assets.icons.logo} rounded />
                  <h1 className="text-center">Penna Digital</h1>
               </Col>
            </InputGroup>
            {error.visible &&
              <InputGroup className="custom-input-group">
                <Alert variant={'danger'}>
                  {error.message}
                </Alert>
              </InputGroup>
            }
            <InputGroup className="custom-input-group">
                <FormControl className="custom-input" placeholder='E-mail. ex: username@provider.com' type="text" value={email} onChange={this.onEmailChange} />
            </InputGroup>
            <InputGroup className="custom-input-group">
                <FormControl className="custom-input" placeholder='password' type="password" value={password} onChange={this.onPasswordChange} />
            </InputGroup>
            <InputGroup className="custom-input-group">
              <Button variant="primary" size="lg" block onClick={this.attemptLogin}>
              {
                  loading ? 
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  :
                  'Login'
                }
              </Button>
            </InputGroup>
        </Container> 
      );
    }
}

export default LoginScreen;
