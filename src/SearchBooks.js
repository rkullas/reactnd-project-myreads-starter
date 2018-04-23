import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

const createMapIdToShelf = (books) => books.reduce((acc, book) => {
    const result = {...acc};
    result[book.id] = book.shelf;
    return result;
}, {});

class SearchBooks extends React.Component {
    state = {
        foundbooks: [],
        query: ''
    };

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    };

    triggerSearch(newQuery) {
        const newState = {query: newQuery};
        if (newQuery !== '') {
            BooksAPI
                .search(newQuery)
                .then(books => {
                    let foundbooks = [];
                    if (this.state.query !== '' && Array.isArray(books)) {
                        foundbooks = books;
                    }
                    this.setState({foundbooks});
                });
        }
        else {
            newState.foundbooks = [];
        }
        this.setState(newState);
    }

    render() {
        const {books, updateShelf} = this.props;
        const bookIdsToShelf = createMapIdToShelf(books);
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={(event) => this.triggerSearch(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!!this.state.foundbooks && this.state.foundbooks.map(book => (
                            <li key={book.id}>
                                <Book book={book} selectedShelf={bookIdsToShelf[book.id] || 'none'}
                                      updateShelf={updateShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;