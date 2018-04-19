import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

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
        books: {
            currentlyReading: [],
            wantToRead: [],
            read: []
        }
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
                    <ListBooks books={this.state.books} />
                )}/>
                <Route exact path='/search' render={() => (
                    <SearchBooks />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
