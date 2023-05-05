import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import {
  Row,
  Card,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardHeader,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { TAB_MENU } from 'utils/CONSTANTS';
import Feedback from './tabepane/Feedback';
import Ticket from './tabepane/Ticket';
import Work from './tabepane/Work';
import Info from './tabepane/Info';
import Schedule from './tabepane/Schedule';
import Attendance from './tabepane/Attendance';
import Service from './tabepane/Service';
import Transaction from './tabepane/Transaction';

const GigsDetailBody = ({
  service,
  schedule,
  transaction,
  attendance,
  feedback,
  ticket,
  work,
}) => {
  const [activeTab, setActiveTab] = useState('transaction');
  // console.log(isModalOpen);
  // console.log(transaction);
  // console.log(schedule);
  // console.log(attendance);
  // console.log(service);

  return (
    <Colxx xxs="12">
      <Row>
        <Colxx xxs="12" xl="12" className="col-left">
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs">
                {TAB_MENU.GIGS.map((data) => (
                  <NavItem key={data.id}>
                    <Card
                      className={classnames({
                        active: activeTab === data.tabId,
                        'nav-link': true,
                      })}
                      onClick={() => setActiveTab(data.tabId)}
                    >
                      <IntlMessages id={data.Label} />
                    </Card>
                  </NavItem>
                ))}
              </Nav>
            </CardHeader>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="transaction">
                <Transaction transaction={transaction} />
              </TabPane>
              <TabPane tabId="schedule">
                <Schedule schedule={schedule} />
              </TabPane>
              <TabPane tabId="attendance">
                <Attendance attendance={attendance} />
              </TabPane>
              <TabPane tabId="service">
                <Service service={service} />
              </TabPane>
              <TabPane tabId="info">
                <Info />
              </TabPane>
              <TabPane tabId="feedback">
                <Feedback feedback={feedback} />
              </TabPane>
              <TabPane tabId="ticket">
                <Ticket ticket={ticket} />
              </TabPane>
              <TabPane tabId="work">
                <Work work={work} />
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
    </Colxx>
  );
};

export default injectIntl(GigsDetailBody);
