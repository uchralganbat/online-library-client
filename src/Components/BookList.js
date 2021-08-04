import React, { useState, useEffect } from 'react';
import { Item } from 'semantic-ui-react';
import OrderModal from './OrderModal';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/mn';
moment.locale('mn');

export default function BookList(props) {
    const [books, setBooks] = useState([]);
    
    useEffect( 
        () => {
            axios.get('http://localhost:4000/books', {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
    .then(function(response) {
        setBooks(response.data);
    })
    .catch(error => console.log(error))
}, [props.searchTerm]);

    return (
        <div>
            <Item.Group divided>
                { books.filter((book) => {
                    if(props.searchTerm === '') {
                        return book
                    } else if(book.bookname.toLowerCase().includes(props.searchTerm.toLowerCase())){
                        return book
                    }
                }).map(
                    book => 
                    <Item key={book.id}>
                    <Item.Image size='small' src='https://storage.cloud.google.com/online_library-1/tokyo_matrix.jpg' />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header>{book.bookname}</Item.Header>
                        <Item.Description>{book.Author.firstName}</Item.Description>
                        <Item.Meta>{`${book.price}₮`}</Item.Meta>
                        <Item.Meta>{moment(book.publishedDate).format("LL")}</Item.Meta>
                        <Item.Extra>
                        <OrderModal floated='right' book={book} onOrderCreatedSuccess={props.onOrderCreatedSuccess}/>
                        </Item.Extra>
                    </Item.Content>
                    </Item>)
                }
            </Item.Group>
        </div>
    )
}
