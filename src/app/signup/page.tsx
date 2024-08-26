"use client"
import { signupAsync } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleSignup = () => {
    dispatch(signupAsync({ email, password }))
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignup} disabled={authState.loading}>
        {authState.loading ? 'Signing Up...' : 'Sign Up'}
      </button>
      {authState.error && <p>Error: {authState.error}</p>}
    </div>
  );
};

export default Signup;
