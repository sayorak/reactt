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
    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
    <p>{book.volumeInfo.title}</p>
    <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors information available'}</p>
    <button onClick={() => onClick(book)}>Show Details</button>
    <button onClick={() => onDelete(book)}>Delete Book</button>
  </li>
);

class BooksList extends React.Component {
  state = {
    books: [],
    searchTerm: '',
    error: null,
    selectedBook: null,
  };

  handleBookClick = (book) => {
    console.log('Book clicked:', book);
    this.setState({ selectedBook: book });
  };

  closeBookDetails = () => {
    console.log('Closing book details');
    this.setState({ selectedBook: null });
  };

  handleDeleteBook = (book) => {
    const { books } = this.state;
    const updatedBooks = books.filter((b) => b.id !== book.id);
    this.setState({ books: updatedBooks, selectedBook: null });
  };

  componentDidMount() {
    this.fetchBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm } = this.state;
    if (prevState.searchTerm !== searchTerm) {
      this.fetchBooks();
    }
  }

  componentWillUnmount() {
    // Cleanup code or any actions to be performed before the component is unmounted
  }

  componentDidCatch(error, errorInfo) {
    // Handle errors that occur in any component below this one
    this.setState({ error: 'An error occurred. Please try again later.' });
  }

  fetchBooks = async () => {
    try {
      const { searchTerm } = this.state;
      if (searchTerm.trim() === '') {
        this.setState({ books: [], error: null });
        return;
      }

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyABrRu__naPG4ZniYuVS5ZM3_emhPcIN74`
      );
      this.setState({ books: response.data.items, error: null });
    } catch (err) {
      console.error('Error fetching books:', err);
      this.setState({ error: 'Error fetching books. Please try again later.' });
    }
  };

  render() {
    const { books, error, selectedBook } = this.state;

    return (
      <div className="books-list">
        {error && <Error message={error} />}
        <h2>Books List</h2>
        <div className="books-container">
          <ul>
            {books.map((book) => (
              <BookListItem
                key={book.id}
                book={book}
                onClick={this.handleBookClick}
                onDelete={this.handleDeleteBook}
              />
            ))}
          </ul>
          {selectedBook && (
            <BookDetails selectedBook={selectedBook} onClose={this.closeBookDetails} />
          )}
        </div>
      </div>
    );
  }
}

export default BooksList;
