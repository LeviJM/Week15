import React, { useState } from 'react';

function NewItem({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://640c79cba3e07380e8f57a5a.mockapi.io/Items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, amount }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // handle error
      })
      .then((newItem) => {
        onAdd(newItem);
      });

    setName('');
    setPrice('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <button className='add' type="submit">Add Item</button>
    </form>
  );
}

export default NewItem;