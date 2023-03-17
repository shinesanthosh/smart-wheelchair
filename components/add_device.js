import React from 'react'
import styles from '../styles/Add_device.module.css'

const Add = () => {
  return (
    <div className={styles.container} >
      <div className={styles.text} >
        You haven&apos;t added any devices yet. Please add a device to view the details. 
      </div>
      <div className={styles.icon} >
        +
      </div>
    </div>
  )
}

export default Add