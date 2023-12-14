import React from 'react';

const BookDetails = ({ selectedBook, onClose }) => {
  return (
    <div className="book-details">
      <h2>{selectedBook.volumeInfo.title}</h2>
      <img
        src={selectedBook.volumeInfo.imageLinks.thumbnail}
        alt={selectedBook.volumeInfo.title}
      />
      <p>
        Authors:{' '}
        {selectedBook.volumeInfo.authors
          ? selectedBook.volumeInfo.authors.join(', ')
          : 'No authors information available'}
      </p>
      <p>
        Description:{' '}
        {selectedBook.volumeInfo.description ||
          'No description available'}
      </p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetails;