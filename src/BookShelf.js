import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = ({books, title, updateShelf}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books && books.map(book => (
                    <li key={book.id}>
                        <Book book={book} selectedShelf={book.shelf} updateShelf={updateShelf}/>
                    </li>
                ))}
            </ol>
        </div>
    </div>
);

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default BookShelf;