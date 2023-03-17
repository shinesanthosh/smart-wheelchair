import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Device_list.module.css'

const Devices = ({ user }) => {
  let device_list = []
  user.devices.map((device, key) => {
    device_list.push(
      <div className={styles.devices}>
        <Image
          src={'/wheelchair.png'}
          alt='device'
          width='250'
          height='250'
        />
        <h4>{device.nickname}</h4>
      </div>
    )
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Devices</h1>

      <div className={styles.deviceList}>{device_list}</div>
    </div>
  )
}

export default Devices
