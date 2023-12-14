import React, { useState } from 'react';

const AddedBooks = ({ books, onDeleteBook }) => {
    return (
      <div className="added-books">
        <h2></h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <p>{`${book.title} by ${book.author}`}</p>
              <button onClick={() => onDeleteBook(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default AddedBooks;
