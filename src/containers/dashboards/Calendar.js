import CalendarToolbar from 'components/CalendarToolbar'
import StyledModal from 'components/modal'
import IntlMessages from 'helpers/IntlMessages'
import { getDirection } from 'helpers/Utils'
import moment from 'moment'
import Parse from 'parse'
import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  Label,
} from 'reactstrap'
import { getAvailability } from '../../components/availability/parseFunctions'

const mapDayToNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
}

const localizer = momentLocalizer(moment)

const getAppointments = async (sellerId) => {
  try {
    const Sellers = Parse.Object.extend('Sellers')
    const query = new Parse.Query(Sellers)
    query.equalTo('objectId', sellerId)
    const results = await query.first()

    if (!results) {
      return []
    }
    const appointments = results.get('appointments')
    return appointments
  } catch (error) {
    console.log(error)
  }
  return []
}
const updateAvailability = async (sellerId, appointments) => {
  try {
    const Sellers = Parse.Object.extend('Sellers')
    const query = new Parse.Query(Sellers)
    query.equalTo('objectId', sellerId)
    const results = await query.find()
    if (results.length === 0) {
      return
    }
    results.forEach((res) => {
      res.set('appointments', appointments)
      res.save()
    })
  } catch (error) {
    console.log(error)
  }
}

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
  const [eventsArray, setEventsArray] = useState([])
  const [availability, setAvailability] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState({})
  const [editEventInput, setEditEventInput] = useState({
    title: '',
  })

  useEffect(() => {
    getAvailability('DeBguZCdhs').then((res) => {
      res.forEach((element) => {
        const { day, empty } = element
        const dayNumber = mapDayToNumber[day]

        setAvailability((prevState) => ({
          ...prevState,
          [dayNumber]: !empty,
        }))
      })
    })
    getAppointments('DeBguZCdhs').then((appointments) => {
      if (appointments) {
        setEventsArray(appointments)
      }
    })
  }, [])

  useEffect(() => {
    console.log(availability)
  }, [JSON.stringify(availability)])

  const onSelectEvent = (event) => {
    setSelectedEvent(event)
    setModalIsOpen(true)
  }

  const handleChange = (e) => {
    setEditEventInput({ ...editEventInput, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { title } = editEventInput

    const editedEvent = {
      ...selectedEvent,
      title,
    }
    const newEventsArray = eventsArray.map((event) => {
      if (event.id === selectedEvent.id) {
        return editedEvent
      }
      return event
    })
    setEventsArray(newEventsArray)
    updateAvailability('DeBguZCdhs', newEventsArray)

    setModalIsOpen(false)
  }

  const dayGetter = (date) => {
    const isAvailable = availability[date.getDay()]

    return { className: isAvailable ? 'available' : 'unavailable' }
  }
  return (
    <Card>
      <StyledModal
        isOpen={modalIsOpen}
        // title={<IntlMessages id="calendar.editEvent" />}
        title={`Edit Event: ${selectedEvent.title}`}
        toggleModal={setModalIsOpen}
      >
        <Form onSubmit={onSubmit}>
          <Label for="title">Title</Label>
          <Input
            onChange={handleChange}
            name="title"
            type="text"
            placeholder={selectedEvent.title}
          />
          <Label>Start Time</Label>
          <Input name="startTime" type="datetime-local" />
          <Label>End Time</Label>
          <Input
            name="endTime"
            type="datetime-local"
            value={selectedEvent.start}
          />
          <br />
          <Button>Save</Button>
        </Form>
      </StyledModal>
      <CardBody>
        <CardTitle>
          <IntlMessages id="menu.calendar" />
        </CardTitle>
        <Calendar
          dayPropGetter={dayGetter}
          localizer={localizer}
          style={{ minHeight: '500px' }}
          events={eventsArray}
          onSelectEvent={(event) => onSelectEvent(event)}
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
