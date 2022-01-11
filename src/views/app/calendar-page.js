import React from 'react'
import { Row } from 'reactstrap'
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'
import CalendarCard from 'containers/dashboards/Calendar'

const Calendar = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.calendar" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.calendar" />
          </p> */}
          <CalendarCard />
        </Colxx>
      </Row>
    </>
  )
}

export default Calendar
