import StyledModal from 'components/modal'
import Switch from 'rc-switch'
import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap'

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

const EditAvailability = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [allDay, setAllDay] = useState(false)
  const [isRepeated, setIsRepeated] = useState(false)
  return (
    <div>
      <StyledModal
        isOpen={modalIsOpen}
        toggleModal={setModalIsOpen}
        title="Edit Availability"
      >
        <div style={{ padding: 20 }}>
          <Form>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input type="date" name="startDate" id="startDate" />
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
                      disabled={allDay}
                      type="time"
                      name="startTime"
                      id="startTime"
                    />
                  </Col>

                  <Col>
                    <Label for="endTime">End Time</Label>
                    <Input
                      disabled={allDay}
                      type="time"
                      name="endTime"
                      id="endTime"
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
                <FormGroup
                  key={day}
                  inline
                  check
                  onChange={(event) => {
                    console.log(event)
                  }}
                >
                  <Label check>
                    <Input name="day" type="checkbox" />
                    {day}
                  </Label>
                </FormGroup>
              ))}
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input type="date" name="endDate" id="endDate" />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input type="textarea" name="notes" id="notes" />
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
    </div>
  )
}

export default EditAvailability
