import React, { useState } from 'react';

const EditNodeModal = ({ node, onSave, onClose, onDelete }) => {
  const [newLabel, setNewLabel] = useState(node.data.label);

  const handleSaveClick = () => {
    onSave(node, newLabel);
  };

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete this node?");
    if (confirmation) {
      onDelete(node);
      onClose();
    }
  };

  return (
    <div className="edit-node-modal">
      <h3>Edit Node</h3>
      <input
        type="text"
        value={newLabel}
        onChange={(e) => setNewLabel(e.target.value)}
      />
      <button onClick={handleSaveClick} style={{ backgroundColor: "green", color: "white" }} >Save</button>
     
      <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditNodeModal;
