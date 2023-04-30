import React from 'react'
import styles from '../styles/Parambox.module.css'
import Chart from './chart'
import { useState } from 'react'

const ParamBox = ({ children, data, type }) => {
  const [expanded, setExpanded] = useState(false)

  const update = data[0]
    ? new Date(data[0].y).toLocaleDateString() +
      '  ' +
      new Date(data[0].y).toLocaleTimeString()
    : '---'

  let unit
  if (type == 'hr') unit = ' bpm'
  else if (type == 'sp') unit = '%'
  else if (type == 'temp') unit = '°F'

  return (
    <div
      className={
        expanded ? `${styles.container} ${styles.expanded}` : styles.container
      }
      onClick={() => setExpanded(!expanded)}>
      <h1> {children}</h1>
      {/* Hide the next 2 spans if expanded is true */}
      {!expanded && (
        <>
          <span>
            Latest reading: &nbsp;
            <span className={styles.reading}>
              {data[0] ? data[0].x : '---'}
              {unit}
            </span>
          </span>

          <span>Last updated at: {update}</span>
        </>
      )}

      {expanded && <Chart data={data.slice().reverse()} type={type} />}
    </div>
  )
}

export default ParamBox
