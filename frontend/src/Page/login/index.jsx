import React from 'react'
import Avatar from '@mui/material/Avatar';
import "./login.scss"
export default function Login() {
  return (
    <a href="http://localhost:5000/auth" className='login-btn d-flex align-items-center justify-content-between'>
        <p className='px-2'> Login with </p>
        <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" />
    </a>
  )
}
