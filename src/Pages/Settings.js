import React, { useContext, useState, useEffect } from 'react';
import MenuBar from '../Components/MenuBar';
import { Table, Input, Button } from 'semantic-ui-react';
import { AuthContext } from '../Context/auth';
import { useForm } from '../Util/hooks';
import axios from 'axios';

export default function Settings() {
    const context = useContext(AuthContext);
    const { user } = context;
    const [userInfo, setUserInfo] = useState({});
    const [update, setUpdate] = useState(0);
    const { onChange, onSubmit, values } = useForm(handleUpdateCallback, {
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: ''
    });
    const handleUpdate = () => {
        axios.put(`http://localhost:4000/${user.id}`, {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
            age: values.age,
            phoneNumber: values.phoneNumber
        }, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
    }
    
    function handleUpdateCallback() {
        handleUpdate();
        setUpdate(update + 1);
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/${user.id}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
        setUserInfo(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
    }, [update]);

    const style = {
        fontWeight: 'bold'
    }
    
    return (
    <div>
        {   userInfo &&
        <div>
            <MenuBar update={update}/>
            <Table celled selectable>
                <Table.Body>
                <Table.Row style={{'cursor': 'pointer'}} >
                    <Table.Cell><div style={style}>Username</div></Table.Cell>
                    <Table.Cell>{userInfo.username}</Table.Cell>
                    <Table.Cell>
                        <Input 
                            placeholder={userInfo.username}
                            value={values.username}
                            onChange={onChange}
                            name="username"
                            type="text"
                        />
                    </Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}>
                    <Table.Cell><div style={style}>Firstname</div></Table.Cell>
                    <Table.Cell>{userInfo.firstName}</Table.Cell>
                    <Table.Cell>
                        <Input 
                            placeholder={userInfo.firstName}
                            value={values.firstName}
                            onChange={onChange}
                            name="firstName"
                            type="text"
                        />
                    </Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}>
                    <Table.Cell><div style={style}>Lastname</div></Table.Cell>
                    <Table.Cell>{userInfo.lastName}</Table.Cell>
                    <Table.Cell>
                        <Input 
                            placeholder={userInfo.lastName}
                            value={values.lastName}
                            onChange={onChange}
                            name="lastName"
                            type="text"
                            />
                    </Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}>
                    <Table.Cell><div style={style}>Phonenumber</div></Table.Cell>
                    <Table.Cell>{userInfo.phoneNumber}</Table.Cell>
                    <Table.Cell>
                        <Input 
                            placeholder={userInfo.phoneNumber}
                            value={values.phoneNumber}
                            onChange={onChange}
                            name="phoneNumber"
                            type="text"
                            />
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <Button size="large" positive onClick={onSubmit}>Save</Button>
            </div>
        </div>}
    </div>
    )
}