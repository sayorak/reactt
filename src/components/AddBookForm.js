import React, { useState } from 'react';
import AddedBooks from './AddedBooks';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddBook = () => {
    // Валидация введенных данных
    if (!title.trim() || !author.trim()) {
      setError('Title and author are required fields.');
      return;
    }

    // Создание новой книги
    const newBook = { id: Date.now(), title, author };

    // Обновление списка книг
    setBooks((prevBooks) => [...prevBooks, newBook]);

    // Ресет ошибок
    setError(null);

    // Очистка формы
    setTitle('');
    setAuthor('');

    // Вывод сообщения об успешном добавлении
    setSuccessMessage('Book added successfully!');
  };

  const handleDeleteBook = (bookId) => {
    // Удаление книги из списка
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div className="add-book-form">
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <button onClick={handleAddBook}>Add Book</button>

      {error && (
        <div style={{ color: 'red' }}>
          {error}
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
      {successMessage && (
        <div style={{ color: 'green' }}>
          {successMessage}
          <button onClick={() => setSuccessMessage(null)}>Close</button>
        </div>
      )}

      <AddedBooks books={books} onDeleteBook={handleDeleteBook} />
    </div>
  );
};

export default AddBookForm;
