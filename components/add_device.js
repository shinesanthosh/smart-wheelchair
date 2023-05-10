import React from 'react'
import styles from '../styles/Add_device.module.css'
import { useState } from 'react'

const Add = ({ user }) => {
  let noDevice = user.devices.length < 1 ? true : false
  // state variables for serial number and device name
  const [serialNumber, setSerialNumber] = useState('')
  const [deviceName, setDeviceName] = useState('')
  const [respMSG, setRespMSG] = useState('')
  // function to handle submit button
  const submitHandler = () => {
    // mkae respmsg please wait..
    setRespMSG('Please wait..')

    // if serial number or nickname is empty set respMsg to Please fill the fields and exit
    if (serialNumber == '' || deviceName == '') {
      setRespMSG('Please fill the fields')
      return
    }

    // send a post request to /api/db/getSerial with the serial number, user.email as userID and device name as nickname

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
      // console log the response body and catch any errors
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // if the response title is error and body is Device not found set respMSG to Device not found
        if (data.title == 'error' && data.body == 'Device not found') {
          setRespMSG('Device not found')
        }
        // else if title is error and body is Invalid Body set respMsg to Invalid body
        else if (data.title == 'error' && data.body == 'Invalid body') {
          setRespMSG('Invalid data')
        }

        //  else if the users array is not empty or the registered property is true set respMSG to Device already registered
        else if (user.devices.length > 0 || data.registered) {
          setRespMSG('Device already registered')
        }

        // else if response is device already registered make it in the respmsg
        else if (
          data.title == 'error' &&
          data.body == 'Device already registered'
        ) {
          setRespMSG('Device already registered')
        }

        // else if the title is success set respMSG to Device added successfully and refresh the page
        else if (data.title == 'success') {
          setRespMSG('Device added successfully')
          window.location.reload()
        }
      })
      .catch(error => {
        console.log(error)
        setRespMSG('Error')
      })

    // reset state variables
    // setSerialNumber('')
    // setDeviceName('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {noDevice
          ? 'You have no devices added. Add a device to get started.'
          : 'Add another device to your account.'}
      </div>
      <div className={styles.icon}>+</div>
      <div className={styles.addDeviceFormContainer}>
        {/* dialog box */}
        <div className={styles.dialogBox}>
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
          {/* button to call submitHanlder */}
          <button
            className={styles.button}
            type='button'
            onClick={submitHandler}>
            Add Device
          </button>
          {/* Span to display errors or messages with a state variable respMSG */}
          <span className={styles.respMSG}>{respMSG ? respMSG : ' '}</span>
        </div>
      </div>
    </div>
  )
}

export default Add
