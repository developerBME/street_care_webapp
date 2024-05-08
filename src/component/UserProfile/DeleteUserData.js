import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteUserData = () => {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    navigate('/DeleteUserPage');
  };

  return (
    <div>
      <button onClick={handleDeleteClick}>
        Delete Data
      </button>
    </div>
  );
};

export default DeleteUserData;
