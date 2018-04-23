import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({books});
            });
    }

    updateExistinBook = (book, newShelf) => {
        BooksAPI
            .update(book, newShelf)
            .then(() => {
                book.shelf = newShelf;
                this.setState({
                    books: this.state.books
                });
            });

    };

    addNewBook = (newBook, newShelf) => {
        BooksAPI
            .update(newBook, newShelf)
            .then(() => {
                BooksAPI
                    .get(newBook.id)
                    .then(loadedBook => {
                        this.state.books.push(loadedBook);
                        this.setState({
                            books: this.state.books
                        });
                    });
            });
    };

    findBook = id => this.state.books.find(book => book.id === id);

    updateShelf = (updatedBook, newShelf) => {
        if (updatedBook.shelf !== newShelf) {
            const book = this.findBook(updatedBook.id);
            if (book) {
                this.updateExistinBook(book, newShelf);
            }
            else {
                this.addNewBook(updatedBook, newShelf);
            }
        }
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks books={this.state.books} updateShelf={this.updateShelf}/>
                )}/>
                <Route exact path='/search' render={() => (
                    <SearchBooks books={this.state.books} updateShelf={this.updateShelf}/>
                )}/>
            </div>
        )
    }
}

export default BooksApp;
