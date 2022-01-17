import React from 'react'
import { Table } from 'reactstrap'
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

const CurrentAvailability = ({ data }) => {
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
        {data.map((day) => {
          return (
            <tr key={day.day}>
              {day.hours.map((hour) => (
                <td key={hour.start}>{`${hour?.start} - ${hour?.end}`}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default CurrentAvailability