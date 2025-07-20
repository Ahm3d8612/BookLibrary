import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    if (borrowedBooks.length >= 3) {
      return false;
    }
    setBorrowedBooks((prev) => [...prev, book]);
    return true;
  };

  const returnBook = (bookId) => {
    setBorrowedBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  return (
    <BookContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BookContext.Provider>
  );
};
