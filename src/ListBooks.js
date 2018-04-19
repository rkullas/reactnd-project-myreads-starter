import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const ListBooks = ({books}) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BookShelf books={books.currentlyReading} title="Currently Reading"/>
                <BookShelf books={books.wantToRead} title="Want to Read"/>
                <BookShelf books={books.read} title="Read"/>
            </div>
        </div>
        <div className="open-search">
            <Link to='/search'>
                Add a book
            </Link>
        </div>
    </div>
);

ListBooks.propTypes = {
    books: PropTypes.object.isRequired
};

export default ListBooks;