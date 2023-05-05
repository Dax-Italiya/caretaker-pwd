import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  Row,
  Col,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS from 'utils/CONSTANTS';
import logo from '../../assets/logos/upload.svg';

const AddNewModalWithOutButton = ({
  modalOpen,
  toggleModal,
  sidebarMenu,
  modalTitle,
  onSubmit = () => {},
  formData,
  formFields = null,
  includeOption = [],
}) => {
  // case:- addvariety
  const [inputFields, setInputFields] = useState(['']);
  const [inputValues, setInputValues] = useState(['']);
  // case:- include
  const [includeExcludeFields, setIncludeExcludeFields] = useState(['']);
  const [includeValue, setIncludeValue] = useState(['']);
  // case:- addtime
  const [timeFields, setTimeFields] = useState(['']);
  const [startTime, setStartTime] = useState(['']);
  const [endTime, setEndTime] = useState(['']);

  useEffect(() => {
    if (!modalOpen) {
      setInputValues(['']);
      setInputFields(['']);
      setIncludeExcludeFields(['']);
      setIncludeValue(['']);
      setTimeFields(['']);
      setStartTime(['']);
      setEndTime(['']);
    }
  }, [modalOpen]);
  // console.log('includeValue', includeValue);
  // console.log('includeExcludeFields', includeExcludeFields);

  useEffect(() => {
    if (includeOption.length !== 0) {
      setIncludeValue(includeOption);
      setIncludeExcludeFields(includeOption.map(() => ''));
    }
  }, [modalOpen]);
  const addField = () => {
    const newInputFields = [...inputFields, ''];
    setInputFields(newInputFields);
  };
  const addIncludeFieo = () => {
    const newInputFields = [...includeExcludeFields, ''];
    setIncludeExcludeFields(newInputFields);
  };
  const addTimeField = () => {
    const newInputFields = [...timeFields, ''];
    setTimeFields(newInputFields);
  };
  const getInputFormate = (data) => {
    switch (data.type) {
      case 'select':
        return (
          <>
            {data?.Label && (
              <Label>
                <IntlMessages id={data.Label} />
              </Label>
            )}
            <Input
              id={data?.id}
              type={data.type}
              size="1"
              required={data?.required}
              defaultValue={formData[data.name]}
            >
              {data.option &&
                data.option.length > 0 &&
                data.option.map((item) => (
                  <option key={`role_${item.value}`} value={item.value}>
                    {item.label ? item.label : item.value}
                  </option>
                ))}

              {formData[data.name] &&
                Array.isArray(formData[data.name]) &&
                formData[data.name].length > 0 &&
                formData[data.name].map((item) => (
                  <option key={`role_${item.value}`} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </Input>
          </>
        );
      case 'checkbox':
        return (
          <div style={{ padding: '0px 23px' }}>
            <Label for={data.id}>
              <Input
                id={data.id}
                type={data.type}
                size="1"
                required={data?.required}
                value={data?.value}
              />
              <IntlMessages id={data.Label} />
            </Label>
          </div>
        );

      case 'variety':
        return (
          <>
            <Row key={data?.id} className="mt-3">
              <Col key={data?.id} md={12}>
                <Label>
                  <IntlMessages id={data?.Label} />
                </Label>
              </Col>

              {/* <Col md={3}>
                <Label>
                  <IntlMessages id="Select" />
                </Label>
              </Col> */}
            </Row>
            {data.field.map((field) => (
              <Row key={field.id} className="my-2">
                <Col md={8}>{getInputFormate(field[0])}</Col>
                <Col md={3}>{getInputFormate(field[1])}</Col>
              </Row>
            ))}
          </>
        );
      case 'icon':
        return (
          <div style={{ border: '1px solid #E7E9EC' }}>
            <Input
              required={data?.required}
              type="file"
              style={{ position: 'absolute', height: '30vh', opacity: '0' }}
            />
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: '30vh' }}
            >
              <img src={logo} alt="Upload" className="d-block" />
              Upload Image
            </div>
          </div>
        );
      case 'include':
        return (
          <>
            <Label className="mb-3 mt-4 d-block">Include & Exclude</Label>
            <Button className="px-4" id={data.id} onClick={addIncludeFieo}>
              {data.Label}
            </Button>
            <Row className="mt-3">
              <Col md={6}>
                <Label>
                  <IntlMessages id="society.desc" />
                </Label>
              </Col>

              <Col md={4}>
                <Label>
                  <IntlMessages id="society.select" />
                </Label>
              </Col>
            </Row>

            {includeExcludeFields.map((value, index) => {
              const id = value + index;
              return (
                <Row key={`${data?.id}_${id}`}>
                  <Col md={6}>
                    <Input
                      id={`${data?.id}_${index}`}
                      type="text"
                      className="my-2"
                      value={includeValue[index]?.option}
                      onChange={(e) => {
                        setIncludeValue((prev) => {
                          const arr = prev;
                          if (arr[index]) {
                            arr[index].option = e.target.value;
                          } else {
                            arr[index] = {
                              option: e.target.value,
                              type: 'include',
                            };
                          }

                          return [...arr];
                        });
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type="select"
                      id={`${data?.id}&${index}`}
                      className="my-2"
                      value={includeValue[index]?.type}
                      onChange={(e) => {
                        setIncludeValue((prev) => {
                          const arr = prev;
                          // console.log(arr);
                          // console.log(includeValue);
                          arr[index].type = e.target.value;
                          return [...arr];
                        });
                      }}
                    >
                      <option value="include">Include</option>
                      <option value="exclude">Exclude</option>
                    </Input>
                  </Col>
                  <Col md={2}>
                    <Button
                      outline
                      className="my-2"
                      style={{ padding: '7px', height: '32px' }}
                      onClick={() => {
                        setIncludeExcludeFields((prev) => {
                          // console.log(prev);
                          prev.splice(index, 1);
                          // console.log(prev);
                          return [...prev];
                        });
                        setIncludeValue((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        });
                        // console.log(includeValue);
                      }}
                    >
                      <i className="simple-icon-close" />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </>
        );

      case 'addtime':
        return (
          <>
            {data.Label && (
              <Label className="mt-5 mb-3 d-block">{data?.Label}</Label>
            )}
            <Button className="px-4" id={data.id} onClick={addTimeField}>
              + Add
            </Button>

            <Row key={data?.id} className="mt-3">
              <Col key={data?.id}>
                <Label>
                  <IntlMessages id="gigs.time" />
                </Label>
              </Col>
            </Row>

            {timeFields.map((value, index) => {
              const id = value + index;
              return (
                <Row key={`${data?.id}_${id}`}>
                  <Col md={5}>
                    <Label>
                      <IntlMessages id="society.start" />
                    </Label>
                    <Input
                      id={`start${data?.id}_${index}`}
                      type="time"
                      className="my-2"
                      value={startTime[index]}
                      onChange={(e) => {
                        setStartTime((prev) => {
                          const arr = prev;
                          arr[index] = e.target.value;
                          return [...arr];
                        });
                      }}
                    />
                  </Col>
                  <Col md={5}>
                    <Label>
                      <IntlMessages id="society.end" />
                    </Label>
                    <Input
                      id={`end${data?.id}_${index}`}
                      type="time"
                      className="my-2"
                      value={endTime[index]}
                      onChange={(e) => {
                        setEndTime((prev) => {
                          const arr = prev;
                          arr[index] = e.target.value;
                          return [...arr];
                        });
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      outline
                      // className="my-5"
                      style={{
                        padding: '7px',
                        height: '32px',
                        marginTop: '37px',
                      }}
                      onClick={() => {
                        // console.log(inputFields);
                        setTimeFields((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        });
                        setStartTime((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        });
                        setEndTime((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        });
                      }}
                    >
                      <i className="simple-icon-close" />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </>
        );
      case 'addvariety':
        return (
          <>
            <Button className="px-4 mt-4" id={data.id} onClick={addField}>
              + Add
            </Button>
            {data.Label && (
              <Label className="my-3 d-block">{data?.Label}</Label>
            )}
            {inputFields.map((value, index) => {
              const i = value + index;
              return (
                <Row key={i}>
                  <Col md={10}>
                    <Input
                      id={`${data?.id}_${index}`}
                      type="text"
                      className="m-2"
                      value={inputValues[index]}
                      onChange={(e) => {
                        setInputValues((prev) => {
                          const arr = prev;
                          arr[index] = e.target.value;
                          return [...arr];
                        });
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      outline
                      style={{
                        padding: '7px',
                        height: '32px',
                        marginTop: '10px',
                      }}
                      onClick={() => {
                        // console.log(inputFields);
                        setInputFields((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        });
                        setInputValues((prev) => {
                          prev.splice(index, 1);
                          return [...prev];
                        });
                      }}
                    >
                      <i className="simple-icon-close" />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </>
        );
      default:
        return (
          <>
            {data?.Label && (
              <Label>
                <IntlMessages id={data.Label} />
              </Label>
            )}
            <Input
              id={data.id}
              name={data.name}
              type={data.type}
              defaultValue={
                formData && data.type !== 'file' ? formData[data.name] : ''
              }
              value={data?.value}
              required={data?.required}
            />
          </>
        );
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id={modalTitle} />
      </ModalHeader>

      <Form onSubmit={onSubmit}>
        <ModalBody>
          {formFields && Array.isArray(formFields) && formFields.length > 0
            ? formFields?.map((data) => (
                <div key={data.id} className="mt-2">
                  {getInputFormate(data)}
                </div>
              ))
            : CONSTANTS.RIGHT_SIDEBAR_FIELD[sidebarMenu].map((data) => (
                <div key={data.id} className="mt-2">
                  {getInputFormate(data)}
                </div>
              ))}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="advisor.cancel" />
          </Button>
          <Button color="primary">
            <IntlMessages id="advisor.submit" />
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddNewModalWithOutButton;
