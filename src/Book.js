import React from 'react';
import PropTypes from 'prop-types';

const shelfs = [
    {
        id: "currentlyReading",
        name: "Currently Reading"
    },
    {
        id: "wantToRead",
        name: "Want to Read"
    },
    {
        id: "read",
        name: "Read"
    },
    {
        id: "none",
        name: "None"
    }
];

const getCheckmark = (shelfWithCheckmark, shelf) => shelfWithCheckmark && shelfWithCheckmark === shelf.id && '\u2713';

const Book = ({book, shelfWithCheckmark, updateShelf}) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 188,
                backgroundImage: book.imageLinks ? `url("${book.imageLinks.thumbnail}")` : undefined
            }}/>
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>Move to...</option>
                    {shelfs.map(shelf => (
                        <option key={shelf.id}
                                value={shelf.id}
                                onClick={() => updateShelf(book, shelf.id)}>
                            {getCheckmark(shelfWithCheckmark, shelf)} {shelf.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
    </div>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelfWithCheckmark: PropTypes.string,
    updateShelf: PropTypes.func.isRequired
};

export default Book;