import React from "react"
import classes from "../styles/Login_prompt.module.css"
import Link from "next/link"

const Login = () => {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <img src="/log.jpg" />

        <div className={classes.content}>
          <h1 className={classes.title}>Smart Wheelchair</h1>
          <p className={classes.desc}>
            The smart wheelchair can change your lives. Control the wheelchair with your gestures or joystick. Monitor the health of the wheelchair user. Get notifications during emergency conditions. You can always monitor your loved ones. But before that, you&apos;ve to login.
          </p>
          <Link href='/login' className={classes.login}>Login</Link>

        </div>

        <div className={classes.flags}>
          <div className={classes.flaga}></div>
          <div className={classes.flagb}></div>
        </div>
      </div>
    </div>
  )
}

export default Login
