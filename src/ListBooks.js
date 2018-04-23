import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

const categorizeBooks = (books) => books.reduce((acc, book) => {
    const result = {...acc};
    switch (book.shelf) {
        case 'currentlyReading':
            result.currentlyReading.push(book);
            break;
        case 'wantToRead':
            result.wantToRead.push(book);
            break;
        case 'read':
            result.read.push(book);
            break;
        case 'none':
            //ignore, because they will not be displayed
            break;
        default:
            console.log(`UNKONW STATE: ${book.shelf}`);
    }
    return result;
}, {
    currentlyReading: [],
    wantToRead: [],
    read: []
});

const ListBooks = ({books, updateShelf}) => {
    const booksPerShelf = categorizeBooks(books);
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <BookShelf books={booksPerShelf.currentlyReading} title="Currently Reading"
                               updateShelf={updateShelf}/>
                    <BookShelf books={booksPerShelf.wantToRead} title="Want to Read" updateShelf={updateShelf}/>
                    <BookShelf books={booksPerShelf.read} title="Read" updateShelf={updateShelf}/>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search'>
                    Add a book
                </Link>
            </div>
        </div>
    );
};

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default ListBooks;