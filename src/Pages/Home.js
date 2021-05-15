import React, { useState } from 'react';
import MenuBar from '../Components/MenuBar';
import { Segment } from 'semantic-ui-react';
import BookList from '../Components/BookList';
import Orders from '../Components/Orders';

export default function Home() {
    const [success, setSuccess] = useState(0)
    const onOrderCreatedSuccess = () => {
        setSuccess(success + 1);
    }
    const [searchTerm, setSearchTerm ] = useState('')

    return (
        <div>
            <MenuBar setSearchTerm={setSearchTerm}/>
            <Segment.Group horizontal>
                <Segment>
                    <BookList searchTerm={searchTerm} onOrderCreatedSuccess={onOrderCreatedSuccess}/>
                </Segment>
                <Segment>
                    <h1 style={{textAlign: 'center'}}>Your Order</h1>
                    <Orders success={success}/>
                </Segment>
            </Segment.Group>
        </div>
    )
}
