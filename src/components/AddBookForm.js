import React, { useState } from 'react';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = () => {
    const newBook = { title, author };
    onAddBook(newBook);

    // Reset form fields
    setTitle('');
    setAuthor('');
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
    </div>
  );
};

export default AddBookForm;
