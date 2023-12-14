import React from 'react';

const BookListItem = ({ book, onClick, onDelete }) => (
  <li>
    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
    <p>{book.volumeInfo.title}</p>
    <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors information available'}</p>
    <button onClick={() => onClick(book)}>Show Details</button>
    <button onClick={() => onDelete(book)}>Delete Book</button>
  </li>
);

export default BookListItem;
