import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RootState } from '@/lib/store';
import { auth } from '@/utils/firebase';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(
      async (dispatch: any) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          dispatch({ type: 'auth/signup/fulfilled', payload: userCredential.user.email });
        } catch (error) {
          dispatch({ type: 'auth/signup/rejected', payload: error.message });
        }
      }
    );
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin} disabled={authState.loading}>
        {authState.loading ? 'Logging in...' : 'Login'}
      </button>
      {authState.error && <p>Error: {authState.error}</p>}
    </div>
  );
};

export default Login;
