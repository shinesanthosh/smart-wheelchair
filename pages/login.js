import React, { useState } from "react"
import classes from "../styles/Login.module.css"
import axios from "axios"
import signin from "../functions/signin"
import { useCookies } from "react-cookie"
import Router from "next/router"
import useStorage from '../hooks/useStorage'


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [submitEnabled, setSubmitEnabled] = useState(true)
  const [cookies, setCookies] = useCookies("appSession")
  const {getItem,setItem}  = useStorage()

  const validatePassword = (pass) => {
    if (pass.length < 6) {
      setErrMsg("Invalid Password.")
      return false
    } else {
      setErrMsg("")

      return true
    }
  }

  const validateUsername = (un) => {
    if (un.length <= 0) {
      setErrMsg("Invalid Username.")
      return false
    } else {
      setErrMsg("")
      return true
    }
  }

  const passwordHandler = ({ target }) => {
    setPassword(target.value)
    validatePassword(target.value)
  }

  const usernameHandler = ({ target }) => {
    setUsername(target.value)
    validateUsername(target.value)
  }

  const submitHandler = async () => {
    if (!validatePassword(password)) return
    if (!validateUsername(username)) return

    setSubmitEnabled(false)
    console.log("accepted")
    let result = await signin(username, password)

    if (result.type == "Succ") {
      setItem('access', result.token.access_token, 'session')
      setItem('id_token', result.token.id_token, 'session')
      setItem('refresh', result.token.refresh_token, 'local')
      Router.push("/dashboard")
    } else if (result.type == "Err") {
      setErrMsg(result.msg)
    } else {
      setErrMsg("Some unexpected error occured")
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.left}>
          <img src='/login.jpg' className={classes.banner} />
        </div>

        <div className={classes.right}>
          <h1>Login</h1>

          <input
            type='text'
            name='username'
            placeholder='Username or email'
            value={username}
            onChange={usernameHandler}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={passwordHandler}
          />
          <p className={classes.errMsg}>{errMsg}</p>
          <input
            className={
              submitEnabled ? classes.buttonEnabled : classes.buttonDisabled
            }
            type='button'
            value='Login'
            onClick={submitHandler}
            // disabled={!submitEnabled}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
