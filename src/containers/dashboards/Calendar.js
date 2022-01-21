import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'

import moment from 'moment'

import CalendarToolbar from 'components/CalendarToolbar'
import IntlMessages from 'helpers/IntlMessages'
import data from 'data/events'

import { getDirection } from 'helpers/Utils'
import StyledModal from 'components/modal'

const localizer = momentLocalizer(moment)

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const hourOptions = {
  hour: 'numeric',
  minute: 'numeric',
}

const CalendarCard = () => {
  const [eventsArray, setEventsArray] = useState(data)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({})
  const [selectedEvent, setSelectedEvent] = useState({})

  // useEffect(() => {
  //   console.log(modalIsOpen)
  // }, [modalIsOpen])
  return (
    <Card>
      <StyledModal
        isOpen={modalIsOpen}
        // title={<IntlMessages id="calendar.editEvent" />}
        title="Edit Event"
        toggleModal={setModalIsOpen}
      >
        Hello
      </StyledModal>
      <CardBody>
        <CardTitle>
          <IntlMessages id="menu.calendar" />
        </CardTitle>
        <Calendar
          localizer={localizer}
          style={{ minHeight: '500px' }}
          events={eventsArray}
          onSelectEvent={(event) => setModalIsOpen(true)}
          selectable
          rtl={getDirection().isRtl}
          views={['month', 'week']}
          components={{
            toolbar: CalendarToolbar,
          }}
        />
      </CardBody>
    </Card>
  )
}
export default CalendarCard
