import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Label } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import AlertPopup from 'components/alert-popup';
import { urlList } from 'utils/CONSTANTS';
import useHttp from 'hooks/Use-http';
import Services from 'utils/API/service';

const VarietyCard = ({ headers, items, varietyLabel, reload }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isCardConfirmationOpen, setIsCardConfirmationOpen] = useState(false);
  const [deleteOptionId, setDeleteOptionId] = useState(null);
  const [itemsList, setItemsList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editLabel, setEditLabel] = useState(null);
  const [addData, setAddData] = useState(null);
  const { serviceId } = useParams();
  const api = useHttp();
  // console.log(deleteVarietyCard);
  // console.log(items);
  // console.log(headers);
  // console.log(itemsList);
  // console.log(varietyLabel);
  useEffect(() => {
    setItemsList(items);
  }, [items]);

  // Add DAta
  const addHandler = (e) => {
    e.preventDefault();

    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < addData[0]?.length; i += 1) {
        if (e.target[`optionName_${i}`]?.value) {
          const payload = {
            optionName: e.target[`optionName_${i}`]?.value,
            varietyLabel: addData[0][i]?.varietyLabel,
            serviceId,
          };
          await Services.post(`/admin/variety`, payload);
        }
      }

      reload((prev) => !prev);
      setAddData(null);
    })();
  };

  // Edit Service Variety Label

  const editLabelData = (e) => {
    e.preventDefault();

    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < itemsList[0].length; i += 1) {
        const payload = {
          varietyLabel: e.target.varietyLabel.value,
        };
        // console.log(payload);
        await Services.patch(`/admin/variety/${itemsList[0][i].id}`, payload);
      }

      reload((prev) => !prev);
      setEditLabel(null);
    })();
  };

  // Edit Service Variety Option

  const editHandler = (e) => {
    const payload = {
      optionName: e.target.optionName?.value,
    };
    // console.log(payload);
    const EDIT_OPTION_API = { ...urlList.editServiceVarietyOption };
    EDIT_OPTION_API.endpoint = EDIT_OPTION_API.endpoint.replace(
      ':id',
      editData?.id
    );
    api.sendRequest(
      EDIT_OPTION_API,
      () => {
        reload((prev) => !prev);
        setEditData(null);
      },
      payload
    );
  };

  // Delete Variety Card
  const deleteCard = () => {
    // console.log(cardId);
    setIsCardConfirmationOpen((prev) => !prev);
  };

  const deleteVarietyCardData = () => {
    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < itemsList[0].length; i += 1) {
        await Services.delete(`/admin/variety/${itemsList[0][i].id}`);
      }

      reload((prev) => !prev);
      setIsCardConfirmationOpen((prev) => !prev);
    })();
  };

  // Delete Variety Option
  const deleteVarietyOptionData = () => {
    const DELETE_VARIETY_OPTION = { ...urlList.deleteServiceVariety };
    DELETE_VARIETY_OPTION.endpoint = DELETE_VARIETY_OPTION.endpoint.replace(
      ':id',
      deleteOptionId
    );
    api.sendRequest(DELETE_VARIETY_OPTION, () => {
      setDeleteOptionId(null);
      reload((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  //   console.log(itemsList.length);
  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_SERVICE_VARIETY_MODAL"
        modalTitle="modal.label.title"
        modalOpen={editLabel !== null}
        toggleModal={() => {
          setEditLabel(null);
        }}
        onSubmit={editLabelData}
        formData={{ varietyLabel: editLabel }}
      />
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_SERVICE_VARIETY_CARD_MODAL"
        modalTitle="modal.option.title"
        modalOpen={editData !== null}
        toggleModal={() => {
          setEditData(null);
        }}
        onSubmit={editHandler}
        formData={editData}
      />
      <AddNewModalWithOutButton
        sidebarMenu="SERVICE_VARIETY_CARD_MODAL"
        modalTitle="modal.option.title"
        modalOpen={addData !== null}
        toggleModal={() => {
          setAddData(null);
        }}
        onSubmit={addHandler}
        formData={addData}
      />
      <AlertPopup
        isOpen={isCardConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete Variety Card?"
        onNegative={() => {
          setIsCardConfirmationOpen((prev) => !prev);
        }}
        onPositive={deleteVarietyCardData}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteOptionId(null);
        }}
        onPositive={deleteVarietyOptionData}
      />
      <Card className="mb-4 rounded-top rounded-bottom">
        <CardBody style={{ overflowX: 'auto' }}>
          <CardTitle className="btn-export">
            <Label className="font-weight-bolder">{varietyLabel}</Label>
            <div>
              <Button
                outline
                className="mx-2"
                onClick={() => {
                  setAddData(itemsList);
                }}
              >
                <i className="iconsminds-add" />
              </Button>
              <Button
                outline
                className="mx-2"
                onClick={() => {
                  setEditLabel(varietyLabel);
                }}
              >
                <i className="simple-icon-note" />
              </Button>
              <Button outline className="mx-2" onClick={deleteCard}>
                <i className="simple-icon-trash" />
              </Button>
            </div>
          </CardTitle>

          <table className="mt-5 h6" width="100%">
            <thead>
              <tr className="mb-3">
                {headers.map((header, index) => {
                  const id = index;
                  return (
                    <th
                      key={id}
                      className={`${header.header === 'No.' ? 'w-5' : ''}`}
                      //   className="p-3"
                    >
                      {header.Header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {itemsList?.map((item) => {
                // console.log(item);
                return item.map((ele, index) => {
                  return (
                    <tr key={ele.id}>
                      <td className="p-2 w-5">{index + 1}</td>
                      {/* {console.log(JSON.parse(item.optionName))} */}
                      <td className="p-2">{ele.optionName}</td>
                      <td className="p-2 w-10">
                        <Button
                          onClick={() => {
                            setEditData(ele);
                          }}
                          outline
                        >
                          <i className="simple-icon-note" />
                        </Button>
                      </td>
                      <td className="p-2 w-10">
                        <Button
                          onClick={() => {
                            setDeleteOptionId(ele.id);
                            setIsConfirmationOpen((prev) => !prev);
                          }}
                          outline
                        >
                          <i className="simple-icon-trash" />
                        </Button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default VarietyCard;
