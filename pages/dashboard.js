import React from "react"
import {  useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client"
import Toolbar from "../components/toolbar"

import styles from "../styles/Dashboard.module.css"

export default withPageAuthRequired(function Dashboard() {

  const { user, error, isLoading } = useUser()

  return (
    <div class={styles.container}>
      <Toolbar user ={user} />
    </div>
  )
})
