import React, { useState, useContext } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { AuthContext } from '../Context/auth';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

export default function OrderModal(props) {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date());
    const { book } = props;
    
    const createOrder = () => {
        axios.post('http://localhost:4000/order', 
        {
            date_shouldGive: date,
            date_gave: '',
            fk_id_book: book.id,
            fk_id_student: user.id,
            order_state: 0
        },
        {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} 
        })
        .then(response => props.onOrderCreatedSuccess())
        .catch(error => console.log(error));
        setOpen(false);
    }
    
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add to order</Button>}
        >
            <Modal.Header>{book.bookname}</Modal.Header>
            <Modal.Content image>
            <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />
            <Modal.Description>
                <Header>Choose the date to give back the book</Header>
                <p>
                Maximum days to borrow a book is a week.
                </p>
                <Calendar 
                    onChange={setDate}
                    value={date}
                />
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button
                content="Proceed"
                labelPosition='right'
                icon='checkmark'
                onClick={() => createOrder()}
                positive
            />
            </Modal.Actions>
        </Modal>
    )
}
