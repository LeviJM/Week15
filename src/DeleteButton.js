import React from 'react';

function DeleteButton({ itemId, onDelete }) {
  const handleClick = () => {
    fetch(`https://640c79cba3e07380e8f57a5a.mockapi.io/Items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDelete(itemId);
        } else {
          // handle error
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return <button className='delete' onClick={handleClick}>Delete</button>;
}

export default DeleteButton;