import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem('access_token')
    navigate('/login')
  }
  return (
    <div className='flex flex-col bg-blue-300 py-5'>
      <header className='container items-center mx-auto flex flex-row justify-between'>
        <div>
            <h1 className='font-semibold text-3xl text-gray-200'>Logo</h1>
        </div>
        <nav>
            <ul className='flex gap-3 flex-row'>
                <li className='text-2xl font-medium text-white'>
                    <Link to={'/'}>Home</Link>
                </li>
                <li className='text-2xl font-medium text-white'>
                    <Link to={'/creatarticle'}>Creat Article</Link>
                </li>
                <button className='px-3 py-2 bg-white rounded-md w-[150px] font-medium' onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
