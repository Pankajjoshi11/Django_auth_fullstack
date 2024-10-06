import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user details
    axios
      .get('http://127.0.0.1:8000/api/accounts/user-details/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Token expired or invalid', error);
        navigate('/login');
      });
  }, [navigate]); // Removed `username` from the dependency array

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to the Home Page, {username}!</h2>
      {userDetails ? (
        <div>
          <h3>User Details:</h3>
          <p>
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userDetails.phone_number}
          </p>
          <p>
            <strong>Address:</strong> {userDetails.address}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
