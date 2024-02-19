import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div>
      <h1>Other Page</h1>
      <p>This is another page accessible to admin users only.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default OtherPage;
