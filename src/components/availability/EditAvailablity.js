import StyledModal from 'components/modal'
import Switch from 'rc-switch'
import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap'
import { getAvailability, updateAvailability, parseDay } from './parseFunctions'

const DAY_CHARACTERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const TIME_FRAME_OPTIONS = [
  '1 Week',
  '2 Weeks',
  '3 Weeks',
  '4 Weeks',
  '5 Weeks',
  '6 Weeks',
  '7 Weeks',
  '8 Weeks',
]

const EditAvailability = () => {
  const [formInput, setFormInput] = useState({
    selectedDays: {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    },
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [allDay, setAllDay] = useState(false)
  const [isRepeated, setIsRepeated] = useState(false)

  useEffect(() => {
    console.log(formInput)
  }, [JSON.stringify(formInput)])

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value })
  }

  const handleSelectedDays = (e) => {
    const oldSelection = formInput.selectedDays || {}

    const newSelection = { ...oldSelection, [e.target.name]: e.target.checked }

    setFormInput({ ...formInput, selectedDays: newSelection })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { selectedDays, startHours, endHours } = formInput

    const availability = []
    Object.keys(selectedDays).forEach((day) => {
      availability.push(parseDay(day, selectedDays[day], startHours, endHours))
    })
    updateAvailability('DeBguZCdhs', availability)
    setModalIsOpen(false)
  }
  return (
    <div>
      <StyledModal
        isOpen={modalIsOpen}
        toggleModal={setModalIsOpen}
        title="Edit Availability"
      >
        <div style={{ padding: 20 }}>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                required
                type="date"
                name="startDate"
                id="startDate"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup row>
              <Col sm={3}>
                <Label>All Day</Label>
                <Switch onChange={(value) => setAllDay(value)} />
              </Col>
              <Col>
                <FormGroup row inline>
                  <Col>
                    <Label for="startTime">Start Time</Label>
                    <Input
                      required
                      disabled={allDay}
                      type="time"
                      name="startHours"
                      id="startHours"
                      onChange={handleChange}
                    />
                  </Col>

                  <Col>
                    <Label for="endTime">End Time</Label>
                    <Input
                      required
                      disabled={allDay}
                      type="time"
                      name="endHours"
                      id="endHours"
                      onChange={handleChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={3}>
                <Label for="repeats">Repeats</Label>
                <Switch onChange={(value) => setIsRepeated(value)} />
              </Col>
              <Col>
                <Label for="timeFrame">Every</Label>
                <Input
                  disabled={!isRepeated}
                  type="select"
                  name="timeFrame"
                  id="timeFrame"
                  onChange={handleChange}
                >
                  {TIME_FRAME_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <Label for="day">Repeats On</Label>
            <FormGroup>
              {DAY_CHARACTERS.map((day) => (
                <FormGroup key={day} inline check>
                  <Label check>
                    <Input
                      onChange={handleSelectedDays}
                      name={day}
                      type="checkbox"
                    />
                    {day}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input
                required
                onChange={handleChange}
                type="date"
                name="endDate"
                id="endDate"
              />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                onChange={handleChange}
                type="textarea"
                name="notes"
                id="notes"
              />
            </FormGroup>
            <FormGroup>
              <Button color="secondary" onClick={() => setModalIsOpen(false)}>
                Cancel
              </Button>
              <Button color="primary">Save</Button>
            </FormGroup>
          </Form>
        </div>
      </StyledModal>

      <Button onClick={() => setModalIsOpen(true)}>Edit</Button>
      <Button
        onClick={() => {
          getAvailability('DeBguZCdhs')
          // updateAvailability('DeBguZCdhs', [
          //   'Monday',
          //   'Tuesday',
          //   'Wednesday',
          //   'Thursday',
          //   'Friday',
          //   'Saturday',
          //   'Sunday',
          // ])
        }}
      >
        Test button
      </Button>
    </div>
  )
}

export default EditAvailability
