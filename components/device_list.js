import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Device_list.module.css'

import Details from './device_details'

const Devices = ({ user, pageState }) => {
  const [selectedDevice, setSelectedDevice] = useState('')
  const [displayState, setDisplayState] = useState(false)

  const updateSelected = device => {
    setDisplayState(true)
    setSelectedDevice(device)
  }

  let device_list = []
  user.devices.map((device, key) => {
    device_list.push(
      <div className={styles.devices} key={key}>
        <Image
          src={'/wheelchair.png'}
          alt='device'
          width='250'
          height='250'
          onClick={() => {
            updateSelected(device)
          }}
        />
        <h4>{device.nickname}</h4>
        {/* <span className={`${styles.statusdot} ${styles.statusdotactive}`}></span> */}
      </div>
    )
  })

  if (displayState) {
    return (
      <Details
        device={selectedDevice}
        setDisplayState={setDisplayState}
        setSelectedDevice={setSelectedDevice}
      />
    )
  } else
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Your Devices</h1>
        {device_list.length < 1 ? (
          <div
            className={styles.nodevicecontainer}
            onClick={() => pageState(0)}>
            <div className={styles.text}>
              You have no devices added. Add a device to get started.
            </div>
            <div className={styles.icon}>+</div>
          </div>
        ) : (
          <div className={styles.deviceList}>{device_list}</div>
        )}
      </div>
    )
}

export default Devices
