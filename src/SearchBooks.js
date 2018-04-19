import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends React.Component {
    state = {
        books: [],
        query: ''
    };

    componentWillUpdate(nextProps, nextState) {
        if (this.state.query !== nextState.query) {
            BooksAPI
                .search(nextState.query)
                .then(result => {
                    let books = [];
                    if (this.state.query !== '' && Array.isArray(result)) {
                        books = result;
                    }
                    this.setState({books});
                });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                               onChange={(event) => this.setState({query: event.target.value})}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!!this.state.books && this.state.books.map(book => (
                            <li key={book.id}>
                                <Book book={book}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

SearchBooks.propTypes = {};

export default SearchBooks;