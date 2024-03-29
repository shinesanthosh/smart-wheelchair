import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from '../styles/Toolbar.module.css'

const Toolbar = ({ user, pageState }) => {
  if (user) {
    OneSignal.push(function () {
      OneSignal.setExternalUserId(user.email)
    })

    OneSignal.push(function () {
      OneSignal.getExternalUserId().then(function (externalUserId) {
        console.log('externalUserId: ', externalUserId)
      })
    })
  }

  useEffect(() => {
    OneSignal.showNativePrompt()
  }, [])

  const [profileMenuStatus, setProfileMenuStatus] = useState(false)
  const [navMenuStatus, setNavMenuStatus] = useState(false)

  return (
    <div className={styles.container}>
      {/* <FontAwesomeIcon icon={faBars} size="2x" /> */}
      <div
        className={styles.bars}
        onClick={() => {
          setNavMenuStatus(!navMenuStatus)
        }}>
        <div
          className={
            navMenuStatus ? `${styles.bar1} ${styles.bar1c}` : `${styles.bar1}`
          }></div>
        <div
          className={
            navMenuStatus ? `${styles.bar2} ${styles.bar2c}` : `${styles.bar2}`
          }></div>
        <div
          className={
            navMenuStatus ? `${styles.bar3} ${styles.bar3c}` : `${styles.bar3}`
          }></div>
      </div>

      <ul
        className={
          navMenuStatus ? styles.navMenu : `${styles.navMenu} ${styles.navHidd}`
        }>
        <div
          className={styles.bars}
          onClick={() => {
            setNavMenuStatus(!navMenuStatus)
          }}>
          <div
            className={
              navMenuStatus
                ? `${styles.bar1} ${styles.bar1c}`
                : `${styles.bar1}`
            }></div>
          <div
            className={
              navMenuStatus
                ? `${styles.bar2} ${styles.bar2c}`
                : `${styles.bar2}`
            }></div>
          <div
            className={
              navMenuStatus
                ? `${styles.bar3} ${styles.bar3c}`
                : `${styles.bar3}`
            }></div>
        </div>
        <li
          onClick={() => {
            pageState(0)
            setNavMenuStatus(false)
          }}>
          Add Wheelchair
        </li>
        <li onClick={() => {
          pageState(1)
          setNavMenuStatus(false)
        }} > View Wheelchairs</li>
        <li>Delete Wheelchair</li>
      </ul>

      <img src='/logo.png' className={styles.navBarLogo} />
      {/* <span className={styles.title}>Wheelchair Monitoring</span> */}

      {/* eslint-disable-next-line */}
      <img
        className={styles.profile}
        src={user ? user.picture : ''}
        onClick={() => {
          setProfileMenuStatus(!profileMenuStatus)
        }}
        onBlur={() => {
          setProfileMenuStatus(false)
        }}
      />

      <ul
        className={
          profileMenuStatus
            ? styles.profileMenu
            : `${styles.profileMenu} ${styles.hidd}`
        }
        onBlur={() => {
          setProfileMenuStatus(false)
        }}>
        <li>
          <Link href='#'>View Profile</Link>
        </li>
        <li>
          <Link href='#'>Change Password</Link>
        </li>
        <li>
          <Link href={'/logout'}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Toolbar
