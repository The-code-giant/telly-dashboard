import React, { useEffect, useState } from 'react'

import { Table } from 'reactstrap'
import { getAvailability } from './parseFunctions'
import './styles.scss'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const CurrentAvailability = () => {
  const [availability, setAvailability] = useState([])

  useEffect(() => {
    getAvailability('DeBguZCdhs').then((res) => {
      console.log(res)
      setAvailability(res)
    })
  }, [])
  return (
    <Table borderless>
      <thead>
        <tr>
          {days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {availability.map((day) => {
          const { empty } = day
          return (
            <tr key={day.day}>
              {day.hours.map((hour) => (
                <td key={hour.start}>
                  {empty ? 'No Data' : `${hour.start} - ${hour.end}`}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default CurrentAvailability
