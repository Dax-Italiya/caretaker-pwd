import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardHeader,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS, { TAB_MENU, urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import useHttp from 'hooks/Use-http';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const UserDetailBody = ({ ticket, noOfServices }) => {
  const [activeTab, setActiveTab] = useState('service');
  const [service, setService] = useState([]);
  const [request, setRequest] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const api = useHttp();
  const { userId } = useParams();
  // console.log(userId);
  // console.log(api);
  // console.log(service);
  // console.log(request);
  //   console.log(transaction);

  useEffect(() => {
    const USER_DATA = { ...urlList.getUserData };
    USER_DATA.endpoint = `${USER_DATA.endpoint}?userId=${userId}`;
    api.sendRequest(USER_DATA, (res) => {
      // console.log(res?.data);
      const services = res?.data.filter((data) => {
        return data?.status === 'approve';
      });
      const requests = res?.data.filter((data) => {
        return data?.status === 'pending';
      });
      const transactions = res?.data.filter((data) => {
        return data?.status === 'complete';
      });
      noOfServices(services.length);
      setService(
        services.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            name: data?.societyService?.service?.name || 'No-service',
            date: moment(data.date).format('MMMM D, YYYY'),
            time: `${moment(data.startTime, 'HH:mm:ss').format(
              'hh:mm A'
            )} to ${moment(data.endTime, 'HH:mm:ss').format('hh:mm A')}`,
            totalPrice: `₹${data?.totalPrice.toLocaleString('en-IN') || '0'}`,
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: () => {},
            },
          };
        })
      );
      setRequest(
        requests.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            name: data?.societyService?.service?.name || 'No-service',
            date: moment(data.date).format('MMMM D, YYYY'),
            time: `${moment(data.startTime, 'HH:mm:ss').format(
              'hh:mm A'
            )} to ${moment(data.endTime, 'HH:mm:ss').format('hh:mm A')}`,
            totalPrice: `₹${data?.totalPrice.toLocaleString('en-IN') || '0'}`,
            action: {
              buttonLabel: 'Assign',
              id: data?.id,
              onClick: () => {},
            },
          };
        })
      );
      setTransaction(
        transactions.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            trId: data?.id,
            date: moment(data.date).format('MMMM D, YYYY'),
            time: `${moment(data.startTime, 'HH:mm:ss').format('hh:mm A')}`,
            totalPrice: `₹${data?.totalPrice.toLocaleString('en-IN') || '0'}`,
          };
        })
      );
    });
  }, []);

  return (
    <Colxx xxs="12">
      <Row>
        <Colxx xxs="12" xl="12" className="col-left">
          <Card className="mb-4">
            <CardHeader>
              <Nav tabs className="card-header-tabs">
                {TAB_MENU.USER.map((data) => (
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
              <TabPane tabId="service">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USER_SERVICE_LIST}
                        items={service}
                        advisorId="table.service"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="request">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USER_REQUEST_LIST}
                        items={request}
                        advisorId="table.user_request"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="transaction">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USER_TRANSACTION_LIST}
                        items={transaction}
                        advisorId="table.transaction"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="ticket">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <ViewTable
                        headers={CONSTANTS.TABLE_HEADER.USER_TICKET_LIST}
                        items={ticket}
                        advisorId="table.ticket"
                      />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
    </Colxx>
  );
};

export default injectIntl(UserDetailBody);
