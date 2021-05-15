import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Context/auth';
import { Button, List, Label, Segment, Transition } from 'semantic-ui-react'


export default function Orders(props) {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [deletedOrder, setDeletedOrder] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:4000/order/${user.id}`, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
            setOrders(response.data);
        })
        .catch(error => console.log(error));
    }, [props.success, deletedOrder]);
    
    const deleteOrder = (id) => {
        axios.delete(`http://localhost:4000/order/${id}`,{
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
            console.log(response);
            setDeletedOrder(deletedOrder + 1)
        })
        .catch(error => console.log(error));
    }

    return (
        <Transition.Group
            as={List}
            duration={200}
        >
            {orders.map(order => 
            <Segment key={order.id}>
                <List>
                    <List.Item>
                    <List.Content floated='right'>
                        {order.order_state === 0 ? (
                            <div>
                                <Button onClick={() => {
                                    deleteOrder(order.id);
                                    }}>Cancel</Button>
                            </div>
                        ) : (
                            <Label color='green'>Approved</Label>
                        )}
                    </List.Content>
                    <List.Content>{order.Book.bookname}</List.Content>
                    {order.order_state === 0 && <Label color='olive'>Pending</Label>}
                    </List.Item>
                </List>
            </Segment>
            )
            }
        </Transition.Group>
    )
}
