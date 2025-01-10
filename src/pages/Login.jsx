import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    const user = {
      username,
      password
    };
    axios.post("https://json-api.uz/api/project/muhsinjon/auth/login", user, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.status === 200) {
        navigate('/');
        const accessToken = res.data.access_token;
        localStorage.setItem('access_token', accessToken);
      }
    })
    .catch(err => {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    });
  }
  function handleRegister(){
    navigate('/register')
  }

  return (
    <div>
      <form className='flex flex-col border w-[450px] rounded-md mx-auto mt-[100px] p-5'>
        <h1 className='text-3xl mb-5'>Login Forma</h1>
        <input
          type="text"
          className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
          placeholder='Enter username'
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="password"
          className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
          placeholder='Enter password'
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          type='submit'
          onClick={handleClick}
          className='w-[400px] p-3 bg-blue-600 rounded-md text-white text-xl'
        >
          Login
        </button>
        <button
          type='submit'
          onClick={handleRegister}
          className='w-[400px] p-3 bg-blue-600 rounded-md mt-5 text-white text-xl'
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
