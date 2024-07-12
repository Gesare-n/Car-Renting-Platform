// BookNotification.js
import React from 'react';

const BookNotification = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
      <p>{message}</p>
      <button
        className="mt-2 bg-white text-green-500 px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default BookNotification;
