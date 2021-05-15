import React, { useContext } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useForm } from '../Util/hooks';
import { AuthContext } from '../Context/auth';

function Login(props) {
  const { onChange, onSubmit, values } = useForm(handeLoginCallback, {
    username: '',
    password: ''
  });
  
  const context = useContext(AuthContext);
  
  const handleLogin = () => {     
    axios.post('http://localhost:4000/authenticate', {
      username: values.username,
      password: values.password
    })
    .then(function (response) {
      console.log(response);
      context.login(response.data);
      props.history.push('/home');
    })
    .catch(function (error) {
      console.log(error);
    });
  } 
  function handeLoginCallback() {
    handleLogin();
  }
return (
    <div className='form-container'>
        <Icon name='book' color='blue' size='huge'/>
        <Form onSubmit={onSubmit}>
            <Form.Input
              label="Username"
              placeholder="Username"
              name="username"
              type="text"
              value={values.username}
              onChange={onChange}
            />
            <Form.Input
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={onChange}
            />
            <Button 
              type='submit' 
            >
              Login
            </Button>
            <p>Don't have any account yet? <a href='http://localhost:3000/register'>register here</a></p>
        </Form>
    </div>
  )
}

export default Login;
