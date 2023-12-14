import React from 'react';
import BookDetails from '../components/BookDetails';
import { Link } from 'react-router-dom';

const BookDetailsPage = ({ book }) => {
  return (
    <div>
      <header>Books Application</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
      </nav>
      <main>
        <h1>Book Details</h1>
        <BookDetails book={book} />
      </main>
      <footer>&copy; 2023 Books Application</footer>
    </div>
  );
};

export default BookDetailsPage;