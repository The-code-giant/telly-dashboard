import React from 'react'
import { Card, CardBody, CardTitle, Row } from 'reactstrap'
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'
import IntlMessages from 'helpers/IntlMessages'
import { CurrentAvailability, EditAvailability } from 'components/availability'

const availabilityData = [
  {
    empty: false,
    day: 'Monday',
    hours: [
      {
        start: '9:00',
        end: '12:00',
      },
      {
        start: '16:00',
        end: '20:00',
      },
    ],
  },
  {
    empty: false,
    day: 'Tuesday',
    hours: [
      {
        start: '9:00',
        end: '12:00',
      },
      {
        start: '16:00',
        end: '20:00',
      },
    ],
  },
  {
    empty: false,
    day: 'Wednesday',
    hours: [
      {
        start: '9:00',
        end: '12:00',
      },
      {
        start: '16:00',
        end: '20:00',
      },
    ],
  },
  {
    empty: true,
    day: 'Thursday',
    hours: [],
  },
  {
    empty: true,
    day: 'Friday',
    hours: [],
  },
  {
    empty: true,
    day: 'Saturday',
    hours: [],
  },
  {
    empty: true,
    day: 'Sunday',
    hours: [],
  },
]

const AvailabilityPage = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.availability" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="Current Availability" />
              </CardTitle>
              <CurrentAvailability data={availabilityData} />
              <EditAvailability data={availabilityData} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default AvailabilityPage
