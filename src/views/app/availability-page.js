import React from 'react'
import { Card, CardBody, CardTitle, Row } from 'reactstrap'
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import Breadcrumb from 'containers/navs/Breadcrumb'
import IntlMessages from 'helpers/IntlMessages'
import { CurrentAvailability, EditAvailability } from 'components/availability'

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
              <CurrentAvailability />
              <EditAvailability />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
}

export default AvailabilityPage
