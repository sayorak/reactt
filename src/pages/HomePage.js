import React from 'react';
import BooksList from '../components/BooksList';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <header>Books Application</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
      </nav>
      <main>
        <h1>Welcome to Books Application</h1>
        <BooksList />
      </main>
      <footer>&copy; 2023 Books Application</footer>
    </div>
  );
};

export default HomePage;