import React, { useState } from 'react'
import signup from '../functions/signup'
import validate from '../functions/passwordValidation'
import classes from '../styles/Login.module.css'
import regUser from '../functions/regUser'
import Router from 'next/router'

const Signup = () => {
  const [formData, setFormData] = useState({
    password: '',
    cnfpassword: '',
    email: '',
    fullName: '',
  })
  const [errMsg, setErrMsg] = useState('')
  const [sucMsg, setSucMsg] = useState('')
  const [submitEnabled, setSubmitEnabled] = useState(false)
  const [displayPswdConditions, setDisplayPswdConditions] = useState(false)
  const [pswdProgress, setPswdProgress] = useState({
    len: false,
    lower: false,
    upper: false,
    num: false,
    ch: false,
  })
  const [emailMsg, setEmailMsg] = useState('')
  const [validationStatus, setValidationStatus] = useState({
    fullName: false,
    email: false,
    password: false,
    cnfpassword: false,
  })

  const formChangeHandler = (e) => {
    const { name, value } = e.target
    let tempValidationStatus = validationStatus
    if (name == 'cnfpassword') {
      if (value != formData.password) {
        setErrMsg('Passwords Do not match')
        tempValidationStatus = { ...tempValidationStatus, cnfpassword: false }
      } else {
        setErrMsg('')
        tempValidationStatus = { ...tempValidationStatus, cnfpassword: true }
      }
    } else if (name == 'password') {
      const validateResult = validate(value)
      let flag = true
      for (let i in validateResult) {
        if (validateResult[i] == false) flag = false
      }
      setPswdProgress(validateResult)
      tempValidationStatus = { ...tempValidationStatus, password: flag }
    } else if (name == 'email') {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setErrMsg('')
        tempValidationStatus = { ...tempValidationStatus, email: true }
      } else {
        setErrMsg('Invalid Email')
        tempValidationStatus = { ...tempValidationStatus, email: false }
      }
    } else if (name == 'fullName') {
      if (value == '') {
        setErrMsg('Full name cannot be empty')
        tempValidationStatus = { ...tempValidationStatus, fullName: false }
      } else {
        setErrMsg('')
        tempValidationStatus = { ...tempValidationStatus, fullName: true }
      }
    }

    setFormData({ ...formData, [name]: value })

    let flag = true
    for (let i in tempValidationStatus) {
      if (tempValidationStatus[i] == false) flag = false
    }
    setSubmitEnabled(flag)

    setValidationStatus(tempValidationStatus)
  }

  const submitHandler = async () => {
    setSucMsg('Signing Up User')

    let username = formData.email.split('@')[0]
    if (username.length > 15) username = username.substring(0, 14)
    else if (username.length < 8) {
      for (let i = 0; i < 8 - username.length; i++)
        username += Math.floor(Math.random() * 10)
    }

    let signupData = {
      ...formData,
      username,
      nickname: formData.fullName,
    }

    console.log(signupData)

    signup(signupData)
      .then((result) => {
        console.warn('%cREs', 'color:yellow', result.data)
        setErrMsg('')
        setSucMsg('Updating DB...')

        regUser({
          email: result.data.email,
          username: result.data.username,
          name: result.data.nickname,
        })
          .then((res) => {
            console.log('%c Response', 'color:green', res)
            if (res.acknowledged) {
              setErrMsg('')
              setSucMsg(
                "Registration successful. You'll be automatically forwarded to sign in page"
              )
              setTimeout(() => {
                Router.push('/login')
              }, 3000)
            } else {
              setSucMsg('')
              setErrMsg('Some error occured while updating the DB')
            }
          })
          .catch((e) => {
            // console.info('Error while updating db: ', e)
            setErrMsg('Some error occured while updating the DB')
          })
      })
      .catch((er) => {
        setSucMsg('')
        if (er.response.data.code == 'invalid_password') {
          if (er.response.data.name == 'PasswordNoUserInfoError')
            setErrMsg(
              'The password must not contain any part of your name, username or Email'
            )
          else setErrMsg('Invalid Password')
        } else if (er.response.data.code == 'invalid_signup')
          setErrMsg('Seems like the account already exists ')
        else setErrMsg('Some unexpected error occured')
      })
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.left}>
          {/* eslint-disable-next-line */}
          <img src='/login.jpg' className={classes.banner} />
        </div>

        <div className={classes.right}>
          <h1>Sign Up</h1>
          <input
            type='text'
            name='fullName'
            placeholder='Full Name'
            value={formData.fullName}
            onChange={formChangeHandler}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={formChangeHandler}
          />
          <p className={classes.errMsg}>{emailMsg}</p>
          <ul className={classes.pswdconditions}>
            <li
              style={pswdProgress.len ? { color: '#393' } : { color: '#f00' }}>
              Password must contain atleast 8 characters
            </li>
            <li
              style={pswdProgress.num ? { color: '#393' } : { color: '#f00' }}>
              Password must contain 1 Number
            </li>
            <li
              style={
                pswdProgress.lower ? { color: '#393' } : { color: '#f00' }
              }>
              Password must contain 1 Lowercase character
            </li>
            <li
              style={
                pswdProgress.upper ? { color: '#393' } : { color: '#f00' }
              }>
              Password must contain 1 Uppercase character
            </li>
            <li style={pswdProgress.ch ? { color: '#393' } : { color: '#f00' }}>
              Password must contain 1 special character (!@#$%^&*)
            </li>
          </ul>

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={formChangeHandler}
            onFocus={() => setDisplayPswdConditions(true)}
            onBlur={() => setDisplayPswdConditions(false)}
          />

          <input
            type='password'
            name='cnfpassword'
            placeholder='Confirm Password'
            value={formData.cnfpassword}
            onChange={formChangeHandler}
          />

          <p className={classes.errMsg}>{errMsg}</p>
          <p className={classes.sucMsg}>{sucMsg}</p>
          <input
            className={
              submitEnabled ? classes.buttonEnabled : classes.buttonDisabled
            }
            type='button'
            value='Sign Up'
            onClick={submitHandler}
            disabled={!submitEnabled}
          />
        </div>
      </div>
    </div>
  )
}

export default Signup
