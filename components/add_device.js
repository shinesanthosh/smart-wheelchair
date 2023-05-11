import React from 'react'
import styles from '../styles/Add_device.module.css'
import { useState } from 'react'

const Add = ({ user }) => {
  let noDevice = user.devices.length < 1 ? true : false

  const [serialNumber, setSerialNumber] = useState('')
  const [deviceName, setDeviceName] = useState('')
  const [respMSG, setRespMSG] = useState('')
  const [showDialog, setShowDialog] = useState(false)

  const submitHandler = () => {
    setRespMSG('Please wait..')

    if (serialNumber == '' || deviceName == '') {
      setRespMSG('Please fill the fields')
      return
    }

    fetch('/api/db/getSerial', {
      method: 'POST',
      body: JSON.stringify({
        serialNumber: serialNumber,
        userId: user.email,
        nickname: deviceName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

        if (data.title == 'error' && data.body == 'Device not found') {
          setRespMSG('Device not found')
        } else if (data.title == 'error' && data.body == 'Invalid body') {
          setRespMSG('Invalid data')
        } else if (user.devices.length > 0 || data.registered) {
          setRespMSG('Device already registered')
        } else if (
          data.title == 'error' &&
          data.body == 'Device already registered'
        ) {
          setRespMSG('Device already registered')
        } else if (data.title == 'success') {
          setRespMSG('Device added successfully')
          window.location.reload()
        }
      })
      .catch(error => {
        console.log(error)
        setRespMSG('Error')
      })

    setSerialNumber('')
    setDeviceName('')
  }

  return (
    <>
      <div className={styles.container} onClick={() => setShowDialog(true)}>
        <div className={styles.text}>
          {noDevice
            ? 'You have no devices added. Add a device to get started.'
            : 'Add another device to your account.'}
        </div>
        <div className={styles.icon}>+</div>
      </div>

      <div
        className={
          showDialog
            ? styles.addDeviceFormContainer
            : `${styles.hiddForm} ${styles.addDeviceFormContainer}`
        }>
        {/* dialog box */}
        <div
          className={
            showDialog
              ? styles.dialogBox
              : `${styles.hiddDialog} ${styles.dialogBox}`
          }>
          {/* input to get serial number */}
          <input
            className={styles.input}
            type='text'
            placeholder='Serial Number'
            value={serialNumber}
            onChange={event => setSerialNumber(event.target.value)}
          />
          {/* input to get device name */}
          <input
            className={styles.input}
            type='text'
            placeholder='Device Name'
            value={deviceName}
            onChange={event => setDeviceName(event.target.value)}
          />

          <div className={styles.btnContainer}>
            {/* button to call submitHanlder */}
            <button
              className={styles.button}
              type='button'
              onClick={submitHandler}>
              Add Device
            </button>

            <button
              className={`${styles.button} ${styles.redBtn}`}
              onClick={() => {
                setShowDialog(!showDialog)
              }}>
              Cancel
            </button>
          </div>
          {/* Span to display errors or messages with a state variable respMSG */}
          <span className={styles.respMSG}>{respMSG ? respMSG : ' '}</span>
        </div>
      </div>
    </>
  )
}

export default Add
