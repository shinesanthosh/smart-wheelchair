import React from 'react'
import classes from '../styles/Login.module.css'
import Link from 'next/link'

const Login = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        Please Login to continue
        <Link href="/login">Login</Link>
      </div>
    </div>
  )
}

export default Login
