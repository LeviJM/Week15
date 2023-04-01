import React, { useState } from 'react';

const EditButton = ({ itemId, itemName, itemPrice, itemAmount, onEdit }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedName, setEditedName] = useState(itemName);
  const [editedPrice, setEditedPrice] = useState(itemPrice);
  const [editedAmount, setEditedAmount] = useState(itemAmount);

  const handleEdit = () => {
    setShowEditForm(!showEditForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the item in the API and the parent component
    onEdit(itemId, editedName, editedPrice, editedAmount);
    setShowEditForm(false);
  };

  return (
    <div>
      <button className='edit' onClick={handleEdit}>Edit</button>
      {showEditForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
          <input
            type="text"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
          />
          <button className='save' type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default EditButton;