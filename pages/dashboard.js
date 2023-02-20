import React, { useState, useEffect } from "react"
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Toolbar from "../components/toolbar"
import getUser from "../functions/getUser"

import styles from "../styles/Dashboard.module.css"

export default function Dashboard() {
  // const { user, error, isLoading } = useUser()
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    getUser.then((res=>setUser(res))).catch((e=>console.error("Error from promise: ", e)))
  }, [])

  return (
    <div className={styles.container}>
      <Toolbar user={user} />
    </div>
  )
}
