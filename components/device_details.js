import React, { useEffect, useState } from 'react'
import styles from '../styles/Device_details.module.css'

import getLog from '../functions/user/getLog'
import Image from 'next/image'
import getDevice from '../functions/device/getDetails'
import ParamBox from './parameter_box'
// import Chart from './chart_test'

const Details = ({ device, setDisplayState, setSelectedDevice }) => {
  const [dataList, setDataList] = useState([])
  const [deviceDetails, setDeviceDetails] = useState({})

  const sparr = [],
    hrarr = [],
    temparr = []

  useEffect(() => {
    getLog(device.device_id)
      .then(res => setDataList(res))
      .catch(e => console.error(e))
    getDevice(device.device_id)
      .then(res => {
        setDeviceDetails(res)
      })
      .catch(e => console.error(e))
  }, [])

  if (dataList.length >= 1) {
    dataList.map(val => {
      let seconds = new Date(val.timeseries).toISOString()
      sparr.push({
        x: val.spo,
        y: seconds,
      })
      hrarr.push({
        x: val.hr,
        y: seconds,
      })
      temparr.push({
        x: val.temp,
        y: seconds,
      })
    })
  }

  const back = () => {
    setSelectedDevice('')
    setDisplayState(false)
  }

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
            if (deviceDetails.last_update.includes('seconds'))
              window.open(deviceDetails.stream, '_blank')
          }}>
          <img src={'/video-camera.png'} />
          <span>
            {/* Display only if deviceDetails.last_update is defined */}

            {deviceDetails.last_update
              ? 'Last seen ' + deviceDetails.last_update + ' ago'
              : null}
          </span>
          {/* Span to say offline if deviceDetails.last_update doesn't include 'seconds*/}
          {deviceDetails.last_update &&
          !deviceDetails.last_update.includes('seconds') ? (
            <span className={styles.offline}>Offline</span>
          ) : null}
        </div>
        <ParamBox data={hrarr} type={'hr'}>
          Heart Rate
        </ParamBox>
        <ParamBox data={sparr} type={'sp'}>
          SPO2
        </ParamBox>
        <ParamBox data={temparr} type={'temp'}>
          Temperature
        </ParamBox>
      </div>
    </div>
  )
}

export default Details
