import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = ({books, title}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                    {books && books.map(book => (
                        <li key={book.id}>
                            <Book book={book}/>
                        </li>
                    ))}
            </ol>
        </div>
    </div>
);

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default BookShelf;