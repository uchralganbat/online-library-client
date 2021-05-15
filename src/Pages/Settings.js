import React, { useContext, useState } from 'react';
import MenuBar from '../Components/MenuBar';
import { Table, Input, Button } from 'semantic-ui-react';
import { AuthContext } from '../Context/auth';

export default function Settings() {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const style = {
        fontWeight: 'bold'
    }
    return (
        <div>
            <MenuBar />
            <Table celled selectable>
                <Table.Body>
                <Table.Row style={{'cursor': 'pointer'}} onClick={() => setOpen(true)}>
                    <Table.Cell><div style={{fontWeight: 'bold'}}>Username</div></Table.Cell>
                    { open === false ? (
                            <Table.Cell>{user.username}</Table.Cell>
                            ) : (
                                <Table.Cell>
                                    <Input placeholder={user.username}/>
                                    <Button.Group>
                                        <Button 
                                        onClick={() => {setOpen(false); console.log(open);}}
                                        >
                                            Cancel
                                        </Button>
                                        <Button.Or />
                                        <Button positive>Save</Button>
                                    </Button.Group>
                                </Table.Cell>
                            )}
                            <Table.Cell><Button onClick={() => setOpen(true)}>Edit</Button></Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}>
                    <Table.Cell><div style={style}>Firstname</div></Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>edit</Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}>
                    <Table.Cell><div style={style}>Lastname</div></Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>edit</Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}> 
                    <Table.Cell><div style={style}>Age</div></Table.Cell>
                    <Table.Cell>{user.age}</Table.Cell>
                    <Table.Cell>edit</Table.Cell>
                </Table.Row>
                <Table.Row style={{'cursor': 'pointer'}}>
                    <Table.Cell><div style={style}>Phonenumber</div></Table.Cell>
                    <Table.Cell>{user.phoneNumber}</Table.Cell>
                    <Table.Cell>edit</Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}
