import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import Link from "next/link"

import styles from "../styles/Toolbar.module.css"

const Toolbar = ({ user }) => {
  const [profileMenuStatus, setProfileMenuStatus] = useState(false)

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faBars} size="2x" />

      <span className={styles.title}>Wheelchair Monitoring</span>

      <img
        className={styles.profile}
        src={user.picture}
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
          <Link href={"/api/auth/logout"}>Logout</Link>
        </li>
      </ul>
    </div>
  )
}

export default Toolbar
