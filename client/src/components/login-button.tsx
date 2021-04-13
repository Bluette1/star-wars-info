import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => (
  <Link to="/login" className="btn btn-secondary">Login</Link>
);

export default LoginButton;
