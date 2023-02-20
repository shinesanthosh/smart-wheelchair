import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import Link from "next/link"

import styles from "../styles/Toolbar.module.css"

const Toolbar = ({ user }) => {
  const [profileMenuStatus, setProfileMenuStatus] = useState(false)

  return (
    <div className={styles.container}>
      {/* <FontAwesomeIcon icon={faBars} size="2x" /> */}
      <div className='container' onclick='myFunction(this)'>
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
      </div>

      <span className={styles.title}>Wheelchair Monitoring</span>

      <img
        className={styles.profile}
        src={user ? user.picture : ''}
        onClick={() => {
          setProfileMenuStatus(!profileMenuStatus)
        }}
      />

      <ul
        className={
          profileMenuStatus
            ? styles.profileMenu
            : `${styles.profileMenu} ${styles.hidd}`
        }>
        <li>View Profile</li>
        <li>Change Password</li>
        <li>
          <Link href={"/logout"}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Toolbar
