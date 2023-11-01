// EditEdgeModal.js
import React, { useState } from 'react';

// const EditEdgeModal = ({ edge, onSave, onClose, onDelete }) => {
//   const [edgeLabel, setEdgeLabel] = useState(edge.label || '');

//   const handleSaveClick = () => {
//     onSave(edge, edgeLabel);
//   };


const EditEdgeModal = ({ edge, onSave, onClose, onDelete }) => {
    const [edgeLabel, setEdgeLabel] = useState(edge.label || '');
  
    const handleSaveClick = () => {
      onSave(edge, edgeLabel);
    };

    return (
        <div className="edit-edge-modal-container">
          <div className="edit-edge-modal">
            <h3>Edit Edge</h3>
            <input
              type="text"
              value={edgeLabel}
              onChange={(e) => setEdgeLabel(e.target.value)}
            />
            <button onClick={handleSaveClick} style={{ backgroundColor: "green", color: "white" }}>Save</button>
            <button onClick={() => onDelete(edge)} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      );
    };

export default EditEdgeModal;
