import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const ListBooks = ({books, onSearchClick}) => (
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
            <a onClick={onSearchClick}>Add a book</a>
        </div>
    </div>
);

ListBooks.propTypes = {
    books: PropTypes.object.isRequired,
    onSearchClick: PropTypes.func.isRequired
};

export default ListBooks;