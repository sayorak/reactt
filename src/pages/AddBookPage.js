
import React, { useState } from 'react';
import AddBookForm from '../components/AddBookForm';
import { Link } from 'react-router-dom';

const AddBookPage = () => {
  // Состояние для хранения списка книг
  const [books, setBooks] = useState([]);

  // Функция для добавления новой книги в список
  const handleAddBook = newBook => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  return (
    <div>
      <header>Books Application</header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Add Book</Link>
      </nav>
      <main>
        <h1>Add New Book</h1>
        <AddBookForm onAddBook={handleAddBook} />
        {/* Добавление отображения добавленных книг */}
        <h2>Added Books:</h2>
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.title} by {book.author}</li>
          ))}
        </ul>
      </main>
      <footer>&copy; 2023 Books Application</footer>
    </div>
  );
};

export default AddBookPage;