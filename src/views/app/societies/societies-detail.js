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
import Flat from './tabpane/Flat';
import User from './tabpane/User';
import Service from './tabpane/Service';
import Parking from './tabpane/Parking';
import Tower from './tabpane/Tower';

const SocietiesDetails = ({ service, towers, flats }) => {
  const [activeTab, setActiveTab] = useState('tower');

  return (
    <Colxx xxs="12">
      <Row>
        <Colxx xxs="12" xl="12" className="col-left">
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs">
                {TAB_MENU.SOCEITIES.map((data) => (
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
              <TabPane tabId="tower">
                <Tower towers={towers} />
              </TabPane>
              <TabPane tabId="flat">
                <Flat NoOfflats={flats} />
              </TabPane>
              <TabPane tabId="service">
                <Service service={service} />
              </TabPane>
              <TabPane tabId="parking">
                <Parking />
              </TabPane>
              <TabPane tabId="user">
                <User />
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
    </Colxx>
  );
};

export default injectIntl(SocietiesDetails);
