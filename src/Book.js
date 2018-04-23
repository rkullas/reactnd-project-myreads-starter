import React from 'react';
import PropTypes from 'prop-types';
import {shelfs} from './Constants';
import {bookStyle} from "./Styles";

const getCheckmark = (selectedShelf, shelf) => selectedShelf === shelf.id && '\u2713';

const Book = ({book, selectedShelf, updateShelf}) => {
    if (book.imageLinks) {
        bookStyle.backgroundImage = `url("${book.imageLinks.thumbnail}")`;
    }
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={bookStyle}/>
                <div className="book-shelf-changer">
                    <select
                        value={selectedShelf}
                        onChange={(event) => updateShelf(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        {shelfs.map(shelf => (
                            <option
                                key={shelf.id}
                                value={shelf.id}>
                                {getCheckmark(selectedShelf, shelf)} {shelf.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    selectedShelf: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default Book;