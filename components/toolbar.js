import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from '../styles/Toolbar.module.css'

const Toolbar = ({ user }) => {
  useEffect(
    () => {
      console.log("Starting user fetch")

      OneSignal.getUserId()
        .then((id) => console.log('Player id: ', id))
        .catch((e) => console.warn('id error: ', e))
    },
    []
  )

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
        <li>Add Wheelchair</li>
        <li> View Wheelchairs</li>
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
