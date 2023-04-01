import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import NewItem from './NewItem';
import EditButton from './EditButton';

const url = new URL('https://640c79cba3e07380e8f57a5a.mockapi.io/Items');

function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(url, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((items) => {
        setItems(items);
      });
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleDelete = (deletedItemId) => {
    setItems(items.filter((item) => item.id !== deletedItemId));
  };

  const handleEdit = (itemId, editedName, editedPrice, editedAmount) => {
    fetch(`${url}/${itemId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: editedName,
        price: editedPrice,
        amount: editedAmount,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((updatedItem) => {
        setItems(
          items.map((item) =>
            item.id === itemId ? updatedItem : item
          ),
        );
      });
  };

  return (
    <div>
      <NewItem onAdd={handleAddItem} />
      {items.map((item) => (
        <div className="row item" key={item.id}>
          <div className="col">{item.name}</div>
          <div className="col">{item.price}</div>
          <div className="col">{item.amount}</div>
          <div className="col">
            <DeleteButton itemId={item.id} onDelete={handleDelete} />
          </div>
          <div className="col">
            <EditButton
              itemId={item.id}
              itemName={item.name}
              itemPrice={item.price}
              itemAmount={item.amount}
              onEdit={handleEdit}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;