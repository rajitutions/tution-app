import React from 'react';
import './UserDetailModal.css';

const UserDetailModal = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <img
          src={user.imageUrl || "https://example.com/default-profile.png"}
          alt={user.name}
          className="modal-user-image"
          onError={(e) => e.target.src = "https://example.com/default-profile.png"} // Handle missing images
        />
        <div className="modal-details-grid">
          <div className="grid-item"><strong>Name:</strong> {user.name}</div>
          <div className="grid-item"><strong>Email:</strong> {user.email}</div>
          <div className="grid-item">
            <strong>Mobile:</strong> 
            <span className="mobile-number">{user.mobile}</span>
            <a href={`tel:${user.mobile}`} className="call-button">Call</a>
          </div>
          <div className="grid-item"><strong>Area:</strong> {user.area || "Not Provided"}</div>
          {user.role === "tutor" && (
            <>
              <div className="grid-item"><strong>Qualification:</strong> {user.qualification || "Not Provided"}</div>
              <div className="grid-item"><strong>Subjects:</strong> {user.subjects?.join(", ") || "Not Provided"}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal; 