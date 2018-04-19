import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import {Route} from 'react-router-dom'

const converBooklistToObject = (books) => books.reduce((acc, book) => {
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
        default:
            console.log(`UNKONW STATE: ${book.shelf}`);
    }
    return result;
}, {
    currentlyReading: [],
    wantToRead: [],
    read: []
});

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: {
            currentlyReading: [],
            wantToRead: [],
            read: []
        },
        showSearchPage: false
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(converBooklistToObject)
            .then((books) => {
                console.log(books);
                this.setState({books});
            });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks books={this.state.books} onSearchClick={() => this.setState({showSearchPage: true})}/>
                )}/>
                <Route exact path='/search' render={() => (
                    <SearchBooks onCloseSearchClick={() => this.setState({showSearchPage: false})}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp;
