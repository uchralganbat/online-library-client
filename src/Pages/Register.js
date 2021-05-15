import React, { useContext } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useForm } from '../Util/hooks';
import { AuthContext } from '../Context/auth';
// import { Link } from 'react-router-dom';

function Register(props) {
    const context = useContext(AuthContext);
    const options = [
        { key: 'muis', text: 'МУИС', value: 1 },
        { key: 'muis-e', text: 'МУИС - Эрдэнэт', value: 2 },
        { key: 'shutis', text: 'ШУТИС', value: 3 },
        { key: 'shutis-d', text: 'ШУТИС - Дархан', value: 4 },
        { key: 'humuunleg', text: 'Хүмүүнлэгийн ухааны сургууль', value: 5 },
        { key: 'ashuis', text: 'АШУҮИС', value: 6 },
        { key: 'ashuis-d', text: 'АШУҮИС-Дорноговь', value: 7 },
        { key: 'haais', text: 'ХААИС', value: 8 },
        { key: 'sezis', text: 'СЭЗИС', value: 9 }
    ]
    const { onChange, onSubmit, values } = useForm(handelRegisterCallback, {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        age: '',
        profession: '',
        phoneNumber: '',
        fk_id_university: ''
    });
    const handleRegister = () => {
        axios.post('http://localhost:4000/register', {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
            age: values.age,
            profession: values.profession,
            phoneNumber: values.phoneNumber,
            fk_id_university: values.fk_id_university
        })
        .then(response => {
            context.login(response.data);
            props.history.push('/home');
            console.log(response);
        })
        .catch(error => console.log(error));
    }
    function handelRegisterCallback () {
        handleRegister();
    }
    console.log(values);
    return (
        <div className="form-container">
            <Icon name='book' color='blue' size='huge'/>
            <Form onSubmit={onSubmit}>
                <Form.Input
                    label="Firstname"
                    placeholder="Firstname"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={onChange}
                />
                <Form.Input
                    label="Lastname"
                    placeholder="Lastname"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={onChange}
                />
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
                <Form.Input
                    label="Age"
                    placeholder="Age"
                    name="age"
                    type="text"
                    value={values.age}
                    onChange={onChange}
                />
                <Form.Input
                    label="Profession"
                    placeholder="Profession"
                    name="profession"
                    type="text"
                    value={values.profession}
                    onChange={onChange}
                />
                <Form.Input
                    label="Phonenumber"
                    placeholder="Phonenumber"
                    name="phoneNumber"
                    type="text"
                    value={values.phoneNumber}
                    onChange={onChange}
                />
                <Form.Select 
                    fluid
                    label='University'
                    name="fk_id_university"
                    options={options}
                    onChange={onChange}
                    placeholder='Unviersity'
                />
                <Button type='submit' >Create an account</Button>
            </Form>
        </div>
    )
}

export default Register;