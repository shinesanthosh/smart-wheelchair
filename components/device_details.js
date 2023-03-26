import React, { useEffect, useState } from 'react'
import styles from '../styles/Device_details.module.css'

import getLog from '../functions/user/getLog'
import Image from 'next/image'
import getDevice from '../functions/device/getDetails'
// import Chart from './chart_test'

const Details = ({ device, setDisplayState, setSelectedDevice }) => {
  const [dataList, setDataList] = useState([])
  const [deviceDetails, setDeviceDetails] = useState({})

  const sparr = [],
    hrarr = [],
    temparr = []

  useEffect(() => {
    getLog(device.device_id)
      .then((res) => setDataList(res))
      .catch((e) => console.error(e))
    getDevice(device.device_id)
      .then((res) => {
        setDeviceDetails(res)
      })
      .catch((e) => console.error(e))
  }, [])

  if (dataList.length >= 1) {
    dataList.map((val) => {
      let seconds = Math.floor(new Date(val.timeseries).getTime()) / 1000 
      sparr.push({
        x: val.spo,
        y:seconds 
      })
      hrarr.push({
        x: val.hr,
        y:seconds 
      })
      temparr.push({
        x: val.temp,
        y:seconds 
      })
    })

    console.log('SP:', sparr, ' HR: ', hrarr, ' Temp: ', temparr)
  }

  const back = () => {
    setSelectedDevice('')
    setDisplayState(false)
  }

  console.log('Data list: ', dataList)

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <span onClick={back} className={styles.backBtn}>
          &lt; Devices
        </span>
        <span className={styles.title}> {device.nickname} </span>
        <span style={{ visibility: 'hidden' }}>&lt; Devices</span>
      </div>

      <div className={styles.cardContainer}>
        <div
          className={styles.streamContainer}
          onClick={() => {
            window.open(deviceDetails.stream, '_blank')
          }}>
          <img src={'/video-camera.png'} />
          <span>Last seen {deviceDetails.last_update} ago</span>
        </div>
        <div>Heart Rate</div>
        <div>SPO2</div>
        <div>Temperature</div>
      </div>
    </div>
  )
}

export default Details
