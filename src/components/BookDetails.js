import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';
import AddBookForm from './AddBookForm';  // Добавим импорт AddBookForm

const Error = ({ message }) => (
  <div style={{ color: 'red' }}>
    <p>Error: {message}</p>
  </div>
);

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  const handleDeleteBook = (book) => {
    const updatedBooks = books.filter((b) => b.id !== book.id);
    setBooks(updatedBooks);
    setSelectedBook(null);
  };

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
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
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=YOUR_API_KEY`
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

  return (
    <div className="books-list">
      {error && <Error message={error} />}
      <h2>Books List</h2>
      <AddBookForm onAddBook={handleAddBook} /> {/* Добавим компонент AddBookForm */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <p>{book.volumeInfo.title}</p>
            <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors information available'}</p>
            <button onClick={() => handleBookClick(book)}>Show Details</button>
            <button onClick={() => handleDeleteBook(book)}>Delete Book</button>
          </li>
        ))}
      </ul>
      {selectedBook && (
        <BookDetails selectedBook={selectedBook} onClose={closeBookDetails} />
      )}
    </div>
  );
};

export default BooksList;
