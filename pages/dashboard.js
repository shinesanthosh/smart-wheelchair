import React, { useState, useEffect } from 'react'
import Toolbar from '../components/toolbar'
import useStorage from '../hooks/useStorage'
import userDetails from '../functions/user/getdetails'

import Loading from '../components/loading'
import Devices from '../components/device_list'
import Add from '../components/add_device'

import styles from '../styles/Dashboard.module.css'
import Router from 'next/router'

export default function Dashboard() {
  // const { user, error, isLoading } = useUser()
  const [user, setUser] = useState(undefined)
  const [pageState, setPageState] = useState(-1)

  const { removeItem } = useStorage()

  // PageState = -1 Loading, show the loading icon
  //pageState = 0 : No wheelchair added, show the add wheelchair stuff
  // Pagestate = 1: Wheelchair added, display the wheelchair list
  // Pagestate = 2: Selected a wheelchair, displa the wheelchair details

  useEffect(() => {
    userDetails
      .then(res => {
        setUser(res)

        if (res.devices.length < 1) {
          setPageState(0)
        } else {
          setPageState(1)
        }
      })
      .catch(e => {
        removeItem('access', 'session')
        if (e.type == 'auth_error') Router.push('/')
      })
  }, [])

  let dashboardData

  if (pageState < 0) dashboardData = <Loading />
  else if (pageState == 0) dashboardData = <Add user={user} />
  else if (pageState == 1)
    dashboardData = <Devices user={user} pageState={setPageState} />

  return (
    <div className={styles.container}>
      <Toolbar user={user} pageState={setPageState} />
      {dashboardData}
    </div>
  )
}
