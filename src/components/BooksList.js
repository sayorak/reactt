import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';

const Error = ({ message }) => (
  <div style={{ color: 'red' }}>
    <p>Error: {message}</p>
  </div>
);

const BookListItem = ({ book, onClick, onDelete }) => (
  <li>
    <img
      src={book.volumeInfo.imageLinks.thumbnail}
      alt={book.volumeInfo.title}
    />
    <p>{book.volumeInfo.title}</p>
    <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors information available'}</p>
    <button onClick={() => onClick(book)}>Show Details</button>
    <button onClick={() => onDelete(book)}>Delete Book</button>
  </li>
);

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    console.log('Book clicked:', book);
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    console.log('Closing book details');
    setSelectedBook(null);
  };

  const handleDeleteBook = (book) => {
    const updatedBooks = books.filter((b) => b.id !== book.id);
    setBooks(updatedBooks);
    setSelectedBook(null);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (searchTerm.trim() === '') {
          setBooks([]);
          setError(null);
          return;
        }

        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyABrRu__naPG4ZniYuVS5ZM3_emhPcIN74`
        );
        setBooks(response.data.items);
        setError(null);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Error fetching books. Please try again later.');
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const authorsList = books
    .map((book) => book.volumeInfo.authors)
    .filter((authors) => authors !== undefined)
    .reduce((accumulator, authors) => accumulator.concat(authors), []);

  return (
    <div className="books-list">
      {error && <Error message={error} />}
      <h2>Books List</h2>
      <p>All Authors: {authorsList.join(', ')}</p>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="books-container">
        <ul>
          {books.map((book) => (
            <BookListItem
              key={book.id}
              book={book}
              onClick={handleBookClick}
              onDelete={handleDeleteBook}
            />
          ))}
        </ul>
        {selectedBook && (
          <BookDetails selectedBook={selectedBook} onClose={closeBookDetails} />
        )}
      </div>
    </div>
  );
};

export default BooksList;
