import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Profile Screen</h1>
      <h2>Welcome, {username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileScreen;
