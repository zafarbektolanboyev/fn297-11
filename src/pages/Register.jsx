import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const user = {
      username,
      password
    }
    console.log("User Data:", user);
    axios.post("https://json-api.uz/api/project/muhsinjon/auth/register", user, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.status === 200) {
        navigate('/login')
      }
    })
    .catch((err) => {
      console.log("Error:", err.response ? err.response.data : err);
      alert('Registration failed! Please check your input.');
    })
  }
  function handleClick(){
    navigate('/login')
  }

  return (
    <div>
      <form className='flex flex-col border w-[450px] rounded-md mx-auto mt-[100px] p-5' onSubmit={handleSubmit}>
        <h1 className='text-3xl mb-5'>Register Forma</h1>
        <input
          type="text"
          className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className='w-[400px] border bg-gray-300 p-3 rounded-md mb-2 text-white text-xl'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className='w-[400px] p-3 bg-blue-600 rounded-md text-white text-xl'
        >
          Register
        </button>
        <button
          type='submit'
          onClick={handleClick}
          className='w-[400px] p-3 mt-5 bg-blue-600 rounded-md text-white text-xl'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Register;
