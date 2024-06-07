import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();

  return (
    <div className="success">
      <h1>Form Submitted Successfully</h1>
      <div>
        <strong>First Name:</strong> {state.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {state.lastName}
      </div>
      <div>
        <strong>Username:</strong> {state.username}
      </div>
      <div>
        <strong>Email:</strong> {state.email}
      </div>
      <div>
        <strong>Phone:</strong> {state.phone}
      </div>
      <div>
        <strong>Country:</strong> {state.country}
      </div>
      <div>
        <strong>City:</strong> {state.city}
      </div>
      <div>
        <strong>PAN:</strong> {state.pan}
      </div>
      <div>
        <strong>Aadhar:</strong> {state.aadhar}
      </div>
    </div>
  );
};

export default Success;
