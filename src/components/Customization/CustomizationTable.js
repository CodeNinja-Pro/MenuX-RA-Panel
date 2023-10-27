import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardHeader,
  Table,
  Row,
  Button,
  Col,
  Input,
  Container
} from 'reactstrap'
import defaultLogo from '../../assets/img/Mpink.svg'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePicture } from '../../store/actions/settingAction'
import { toast } from 'react-toastify'
import { updateColors } from '../../store/actions/authActions'
import PopUp from '../PopUp'
import { LinearProgress } from '@mui/material'

const CustomizationTable = ({
  data,
  logo,
  addToggle,
  editToggle,
  deleteToggle,
  setEditData,
  setIndex
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const { user, userPermissions } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.setting)
  const [colorSelect, setColorSelect] = useState(false)
  const [customerSelect, setCustomerSelect] = useState(false)
  const [adminColor, setadminColor] = useState('')
  const [customerColor, setCustomerColor] = useState('')
  // console.log("adminColor", adminColor);
  useEffect(() => {
    setadminColor(user?.adminColor || '#d70365')
    setCustomerColor(user?.customerColor || '#d70365')
  }, [user])
  const customizationPermissions = userPermissions?.customization

  const togglePopup = () => {
    setColorSelect(!colorSelect)
  }
  const togglePopupCustomer = () => {
    setCustomerSelect(!customerSelect)
  }
  const [img, setImages] = useState()
  // console.log("img", img);
  const handleUpdateLogo = e => {
    let item2 = {
      id: user?.id,
      img: e.target.files[0]
    }
    setImages(e.target.files[0])
    let MAX_FILE_SIZE = 1024 * 1024
    const fileSizeKiloBytes = e.target.files[0].size
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      toast.warn('File size is greater than 1MB', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } else {
      dispatch(updateProfilePicture(item2))
    }
  }
  return (
    <>
      <Container fluid>
        <Row>
          <div className='col'>
            {user?.type === 'kitchen-admin' ? (
              <>
                {customizationPermissions?.get ? (
                  <Card className='shadow'>
                    <CardHeader className='d-lg-flex  d-sm-block justify-content-between'>
                      <div className='d-flex align-items-center'>
                        <h3 className=' pt-2'>Customization</h3>
                      </div>
                      {customizationPermissions?.add ? (
                        <Button color='primary' onClick={addToggle}>
                          Add
                        </Button>
                      ) : (
                        ''
                      )}
                    </CardHeader>

                    <Table
                      className='align-items-center table-flush'
                      responsive
                    >
                      <thead className='thead-light'>
                        <tr>
                          <th scope='col'>Image</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((el, id) => {
                            return (
                              <tr key={id}>
                                <th scope='row'>
                                  <img
                                    src={el}
                                    height={50}
                                    width={50}
                                    className='rounded'
                                  />
                                </th>
                                <td>
                                  {customizationPermissions?.update ? (
                                    <>
                                      {' '}
                                      <Button
                                        className='btn-sm'
                                        color='primary'
                                        onClick={() => {
                                          setIndex(id)
                                          setEditData(el)
                                          editToggle()
                                        }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        className='btn-sm'
                                        color='danger'
                                        onClick={() => {
                                          setEditData(el)
                                          deleteToggle()
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </Table>
                    <div className='pb-3 mt-4'>
                      <h3 className='px-3'>Replace Your logo</h3>
                      <div
                        style={{
                          position: 'relative',
                          width: '60px',
                          height: '60px'
                        }}
                      >
                        {loading ? (
                          <LinearProgress />
                        ) : (
                          <img
                            className='ml-3 img-fluid rounded-circle'
                            style={{
                              width: '60px',
                              height: '60px'
                            }}
                            src={
                              (img && URL.createObjectURL(img)) ||
                              logo ||
                              defaultLogo
                            }
                            // {logo ? logo : defaultLogo}
                          />
                        )}

                        {customizationPermissions?.update ? (
                          <>
                            {loading ? null : (
                              <i
                                className='fas fa-edit  text-primary bg-white rounded-circle p-1 cursor-pointer'
                                onClick={() => {
                                  inputRef.current.click()
                                }}
                                style={{
                                  position: 'absolute',
                                  right: '-23px',
                                  bottom: '1px',
                                  border: '1px solid #ffff'
                                }}
                              ></i>
                            )}
                            <input
                              type='file'
                              hidden
                              ref={inputRef}
                              onChange={handleUpdateLogo}
                            />
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className='px-3'>
                      <div className='d-flex'>
                        <h3 className=' pt-2'>Admin Color </h3>
                      </div>
                      {colorSelect && (
                        <PopUp
                          handleClose={togglePopup}
                          color={adminColor}
                          setColor={setadminColor}
                        />
                      )}

                      <Row className='d-flex justify-content-center align-items-center'>
                        <Col>
                          <Input type='text' value={adminColor} disabled />
                        </Col>
                        <Col>
                          <Button onClick={() => setColorSelect(!colorSelect)}>
                            Select
                          </Button>
                        </Col>
                      </Row>
                      <h3 className=' pt-5'>Customer Site Color</h3>
                      <Row className='d-flex justify-content-center align-items-center'>
                        <Col>
                          <Input type='text' value={customerColor} disabled />
                        </Col>
                        <Col>
                          <Button
                            onClick={() => setCustomerSelect(!customerSelect)}
                          >
                            Select
                          </Button>
                        </Col>
                      </Row>
                      {customerSelect && (
                        <PopUp
                          handleClose={togglePopupCustomer}
                          color={customerColor}
                          setColor={setCustomerColor}
                        />
                      )}
                      {customizationPermissions?.update ? (
                        <Button
                          color='primary'
                          className='mt-5 float-right mb-3'
                          onClick={() => {
                            let obj = {
                              customerColor,
                              adminColor
                            }
                            if (obj) {
                              dispatch(updateColors(user?.restaurantID, obj))
                              console.log({ obj })
                            }
                          }}
                        >
                          Update
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                  </Card>
                ) : (
                  <Row>You don't have the permsions to access the page</Row>
                )}
              </>
            ) : (
              <Card className='shadow'>
                <CardHeader className='d-lg-flex  d-sm-block justify-content-between'>
                  <div className='d-flex align-items-center'>
                    <h3 className=' pt-2'>Customization</h3>
                  </div>

                  <Button color='primary' onClick={addToggle}>
                    Add Banner
                  </Button>
                </CardHeader>

                <Table className='align-items-center table-flush' responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Image</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((el, id) => {
                        return (
                          <tr key={id}>
                            <th scope='row'>
                              <img
                                src={el}
                                height={50}
                                width={50}
                                className='rounded'
                              />
                            </th>
                            <td>
                              <Button
                                className='btn-sm'
                                color='primary'
                                onClick={() => {
                                  setIndex(id)
                                  setEditData(el)
                                  editToggle()
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                className='btn-sm'
                                color='danger'
                                onClick={() => {
                                  setEditData(el)
                                  deleteToggle()
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </Table>
                <div className='pb-3 mt-4'>
                  <h3 className='px-3'>Replace Your logo</h3>
                  <div
                    style={{
                      position: 'relative',
                      width: '60px',
                      height: '60px'
                    }}
                  >
                    {loading ? (
                      <LinearProgress />
                    ) : (
                      <img
                        className='ml-3 img-fluid rounded-circle'
                        style={{
                          width: '60px',
                          height: '60px'
                        }}
                        src={
                          (img && URL.createObjectURL(img)) ||
                          logo ||
                          defaultLogo
                        }
                        // src={logo.length > 0 ? logo[0] : defaultLogo}
                      />
                    )}

                    <>
                      {loading ? null : (
                        <i
                          className='fas fa-edit  text-primary bg-white rounded-circle p-1 cursor-pointer'
                          onClick={() => {
                            inputRef.current.click()
                          }}
                          style={{
                            position: 'absolute',
                            right: '-23px',
                            bottom: '1px',
                            border: '1px solid #ffff'
                          }}
                        ></i>
                      )}
                      <input
                        type='file'
                        hidden
                        ref={inputRef}
                        onChange={handleUpdateLogo}
                      />
                    </>
                  </div>
                </div>
                <div className='px-3'>
                  <div className='d-flex align-items-center'>
                    <h3 className=' pt-2'>Admin Color</h3>
                    <div
                      className='mx-2'
                      style={{
                        height: '30px',
                        width: '30px',
                        background: `${adminColor}`,
                        borderRadius: '50%'
                      }}
                    ></div>
                  </div>
                  {colorSelect && (
                    <PopUp
                      handleClose={togglePopup}
                      color={adminColor}
                      setColor={setadminColor}
                    />
                  )}

                  <Row className='d-flex justify-content-center align-items-center'>
                    <Col>
                      <Input type='text' value={adminColor} disabled />
                    </Col>
                    <Col>
                      <Button onClick={() => setColorSelect(!colorSelect)}>
                        Select
                      </Button>
                    </Col>
                  </Row>
                  <div className='d-flex align-items-center'>
                    <h3 className=' pt-2'>Customer Site Color</h3>
                    <div
                      className='mx-2'
                      style={{
                        height: '30px',
                        width: '30px',
                        background: `${customerColor}`,
                        borderRadius: '50%'
                      }}
                    ></div>
                  </div>
                  <Row className='d-flex justify-content-center align-items-center'>
                    <Col>
                      <Input type='text' value={customerColor} disabled />
                    </Col>
                    <Col>
                      <Button
                        onClick={() => setCustomerSelect(!customerSelect)}
                      >
                        Select
                      </Button>
                    </Col>
                  </Row>
                  {customerSelect && (
                    <PopUp
                      handleClose={togglePopupCustomer}
                      color={customerColor}
                      setColor={setCustomerColor}
                    />
                  )}

                  <Button
                    color='primary'
                    className='mt-5 float-right mb-3'
                    onClick={() => {
                      let obj = {
                        customerColor,
                        adminColor
                      }
                      if (obj) {
                        dispatch(updateColors(user?.restaurantID, obj))
                        console.log({ obj })
                      }
                    }}
                  >
                    Update
                  </Button>
                </div>
              </Card>
            )}
            {/* <Card className="shadow">
            <CardHeader className="d-lg-flex  d-sm-block justify-content-between">
              <div className="d-flex align-items-center">
                <h3 className=" pt-2">Customization</h3>
              </div>

              <Button color="primary" onClick={addToggle}>
                Add
              </Button>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((el, id) => {
                    return (
                      <tr key={id}>
                        <th scope="row">
                          <img src={el?.url} height={50} width={50} />
                        </th>
                        <td>
                          <Button
                            className="btn-sm"
                            color="primary"
                            onClick={() => {
                              setIndex(id);
                              setEditData(el);
                              editToggle();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="btn-sm"
                            color="danger"
                            onClick={() => {
                              setEditData(el);
                              deleteToggle();
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <div className="pb-3 mt-4">
              <h3 className="px-3">Replace Your logo</h3>
              <div className="px-3" style={{ position: "relative" }}>
                {loading ? (
                  <Spinner />
                ) : (
                  <img
                    alt="Card image cap"
                    height={70}
                    width={70}
                    src={logo ? logo : defaultLogo}
                  />
                )}

                <div className="d-flex justify-content-center align-items-center">
                  {loading ? null : (
                    <i
                      class="fas fa-edit"
                      onClick={() => {
                        inputRef.current.click();
                      }}
                      style={{
                        position: "absolute",
                        left: "37px",
                        bottom: "0px",
                        padding: "5px",
                        background: "black",
                      }}
                    ></i>
                  )}
                  <input
                    type="file"
                    hidden
                    ref={inputRef}
                    onChange={handleUpdateLogo}
                  />
                </div>
              </div>
            </div>
            <div className="px-3">
              <h3 className=" pt-2">Admin Color</h3>
              {colorSelect && (
                <PopUp
                  handleClose={togglePopup}
                  color={adminColor}
                  setColor={setadminColor}
                />
              )}

              <Row className="d-flex justify-content-center align-items-center">
                <Col>
                  <Input type="text" value={adminColor} disabled />
                </Col>
                <Col>
                  <Button onClick={() => setColorSelect(!colorSelect)}>
                    Select
                  </Button>
                </Col>
              </Row>
              <h3 className=" pt-5">Customer Site Color</h3>
              <Row className="d-flex justify-content-center align-items-center">
                <Col>
                  <Input type="text" value={customerColor} disabled />
                </Col>
                <Col>
                  <Button onClick={() => setCustomerSelect(!customerSelect)}>
                    Select
                  </Button>
                </Col>
              </Row>
              {customerSelect && (
                <PopUp
                  handleClose={togglePopupCustomer}
                  color={customerColor}
                  setColor={setCustomerColor}
                />
              )}

              <Button
                color="primary"
                className="mt-5 float-right mb-3"
                onClick={() => {
                  let obj = {
                    customerColor,
                    adminColor,
                  };
                  if (obj) {
                    dispatch(updateColors(user?.restaurantID, obj));
                  }
                }}
              >
                Update
              </Button>
            </div>
          </Card> */}
          </div>
        </Row>
      </Container>
    </>
  )
}

export default CustomizationTable

// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardFooter,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Table,
//   Row,
//   Button,
//   Spinner,
//   CardBody,
//   Col,
//   Input,
// } from "reactstrap";
// import defaultLogo from "../../assets/img/Mpink.svg";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfilePicture } from "store/actions/settingAction";
// import { toast } from "react-toastify";
// import { updateColors } from "store/actions/authActions";
// import PopUp from "../PopUp";

// const CustomizationTable = ({
//   data,
//   logo,
//   addToggle,
//   editToggle,
//   deleteToggle,
//   setEditData,
//   setIndex,
// }) => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const inputRef = useRef(null);
//   const { user, userPermissions } = useSelector((state) => state.auth);
//   const { loading } = useSelector((state) => state.setting);
//   const [colorSelect, setColorSelect] = useState(false);
//   const [customerSelect, setCustomerSelect] = useState(false);
//   const [adminColor, setadminColor] = useState("#d70365");
//   const [customerColor, setCustomerColor] = useState("#d70365");
//   console.log("adminColor", adminColor);

//   const customizationPermissions = userPermissions?.customization;

//   const togglePopup = () => {
//     setColorSelect(!colorSelect);
//   };
//   const togglePopupCustomer = () => {
//     setCustomerSelect(!customerSelect);
//   };

//   const handleUpdateLogo = (e) => {
//     let item = {
//       id: user?.restaurantID,
//       imgURL: logo,
//       img: e.target.files[0],
//     };
//     let item2 = {
//       id: user?.restaurantID,
//       img: e.target.files[0],
//     };
//     let MAX_FILE_SIZE = 1024 * 1024;
//     const fileSizeKiloBytes = e.target.files[0].size;
//     if (fileSizeKiloBytes > MAX_FILE_SIZE) {
//       toast.warn("File size is greater than 1MB");
//     } else {
//       if (logo) {
//         dispatch(updateProfilePicture(item));
//       } else {
//         dispatch(updateProfilePicture(item2));
//       }
//     }
//   };
//   return (
//     <>
//       <Row>
//         <div className="col">
//           {user?.type == "kitchen-admin" ? (
//             <>
//               {customizationPermissions?.get ? (
//                 <Card className="shadow">
//                   <CardHeader className="d-lg-flex  d-sm-block justify-content-between">
//                     <div className="d-flex align-items-center">
//                       <h3 className=" pt-2">Customization</h3>
//                     </div>
//                     {customizationPermissions?.add ? (
//                       <Button color="primary" onClick={addToggle}>
//                         Add
//                       </Button>
//                     ) : (
//                       ""
//                     )}
//                   </CardHeader>

//                   <Table className="align-items-center table-flush" responsive>
//                     <thead className="thead-light">
//                       <tr>
//                         <th scope="col">Image</th>
//                         <th scope="col">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {data &&
//                         data.map((el, id) => {
//                           return (
//                             <tr key={id}>
//                               <th scope="row">
//                                 <img src={el?.url} height={50} width={50} />
//                               </th>
//                               <td>
//                                 {customizationPermissions?.update ? (
//                                   <>
//                                     {" "}
//                                     <Button
//                                       className="btn-sm"
//                                       color="primary"
//                                       onClick={() => {
//                                         setIndex(id);
//                                         setEditData(el);
//                                         editToggle();
//                                       }}
//                                     >
//                                       Edit
//                                     </Button>
//                                     <Button
//                                       className="btn-sm"
//                                       color="danger"
//                                       onClick={() => {
//                                         setEditData(el);
//                                         deleteToggle();
//                                       }}
//                                     >
//                                       Delete
//                                     </Button>
//                                   </>
//                                 ) : (
//                                   ""
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                     </tbody>
//                   </Table>
//                   <div className="pb-3 mt-4">
//                     <h3 className="px-3">Replace Your logo</h3>
//                     <div
//                       style={{
//                         position: "relative",
//                         width: "60px",
//                         height: "60px",
//                       }}
//                     >
//                       {loading ? (
//                         <Spinner className="ml-3" size="sm" />
//                       ) : (
//                         <img
//                           className="ml-3 img-fluid rounded-circle"
//                           alt="Card image cap"
//                           style={{
//                             width: "60px",
//                             height: "60px",
//                           }}
//                           src={logo.length > 0 ? logo[0] : defaultLogo}
//                         />
//                       )}

//                       {customizationPermissions?.update ? (
//                         <>
//                           {loading ? null : (
//                             <i
//                               className="fas fa-edit  text-primary bg-white rounded-circle p-1 cursor-pointer"
//                               onClick={() => {
//                                 inputRef.current.click();
//                               }}
//                               style={{
//                                 position: "absolute",
//                                 right: "-23px",
//                                 bottom: "1px",
//                                 border: "1px solid #ffff",
//                               }}
//                             ></i>
//                           )}
//                           <input
//                             type="file"
//                             hidden
//                             ref={inputRef}
//                             onChange={handleUpdateLogo}
//                           />
//                         </>
//                       ) : (
//                         ""
//                       )}
//                     </div>
//                   </div>
//                   <div className="px-3">
//                     <h3 className=" pt-2">Admin Color</h3>
//                     {colorSelect && (
//                       <PopUp
//                         handleClose={togglePopup}
//                         color={adminColor}
//                         setColor={setadminColor}
//                       />
//                     )}

//                     <Row className="d-flex justify-content-center align-items-center">
//                       <Col>
//                         <Input type="text" value={adminColor} disabled />
//                       </Col>
//                       <Col>
//                         <Button onClick={() => setColorSelect(!colorSelect)}>
//                           Select
//                         </Button>
//                       </Col>
//                     </Row>
//                     <h3 className=" pt-5">Customer Site Color</h3>
//                     <Row className="d-flex justify-content-center align-items-center">
//                       <Col>
//                         <Input type="text" value={customerColor} disabled />
//                       </Col>
//                       <Col>
//                         <Button
//                           onClick={() => setCustomerSelect(!customerSelect)}
//                         >
//                           Select
//                         </Button>
//                       </Col>
//                     </Row>
//                     {customerSelect && (
//                       <PopUp
//                         handleClose={togglePopupCustomer}
//                         color={customerColor}
//                         setColor={setCustomerColor}
//                       />
//                     )}
//                     {customizationPermissions?.update ? (
//                       <Button
//                         color="primary"
//                         className="mt-5 float-right mb-3"
//                         onClick={() => {
//                           let obj = {
//                             customerColor,
//                             adminColor,
//                           };
//                           if (obj) {
//                             dispatch(updateColors(user?.restaurantID, obj));
//                           }
//                         }}
//                       >
//                         Update
//                       </Button>
//                     ) : (
//                       ""
//                     )}
//                   </div>
//                 </Card>
//               ) : (
//                 <Row>You don't have the permsions to access the page</Row>
//               )}
//             </>
//           ) : (
//             <Card className="shadow">
//               <CardHeader className="d-lg-flex  d-sm-block justify-content-between">
//                 <div className="d-flex align-items-center">
//                   <h3 className=" pt-2">Customization</h3>
//                 </div>

//                 <Button color="primary" onClick={addToggle}>
//                   Add
//                 </Button>
//               </CardHeader>

//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Image</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data &&
//                     data.map((el, id) => {
//                       return (
//                         <tr key={id}>
//                           <th scope="row">
//                             <img src={el?.url} height={50} width={50} />
//                           </th>
//                           <td>
//                             <Button
//                               className="btn-sm"
//                               color="primary"
//                               onClick={() => {
//                                 setIndex(id);
//                                 setEditData(el);
//                                 editToggle();
//                               }}
//                             >
//                               Edit
//                             </Button>
//                             <Button
//                               className="btn-sm"
//                               color="danger"
//                               onClick={() => {
//                                 setEditData(el);
//                                 deleteToggle();
//                               }}
//                             >
//                               Delete
//                             </Button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </Table>
//               <div className="pb-3 mt-4">
//                 <h3 className="px-3">Replace Your logo</h3>
//                 <div
//                   style={{
//                     position: "relative",
//                     width: "60px",
//                     height: "60px",
//                   }}
//                 >
//                   {loading ? (
//                     <Spinner className="ml-3" size="sm" />
//                   ) : (
//                     <img
//                       className="ml-3 img-fluid rounded-circle"
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                       }}
//                       alt="Card image cap"
//                       src={logo.length > 0 ? logo[0] : defaultLogo}
//                     />
//                   )}

//                   <>
//                     {loading ? null : (
//                       <i
//                         className="fas fa-edit  text-primary bg-white rounded-circle p-1 cursor-pointer"
//                         onClick={() => {
//                           inputRef.current.click();
//                         }}
//                         style={{
//                           position: "absolute",
//                           right: "-23px",
//                           bottom: "1px",
//                           border: "1px solid #ffff",
//                         }}
//                       ></i>
//                     )}
//                     <input
//                       type="file"
//                       hidden
//                       ref={inputRef}
//                       onChange={handleUpdateLogo}
//                     />
//                   </>
//                 </div>
//               </div>
//               <div className="px-3">
//                 <h3 className=" pt-2">Admin Color</h3>
//                 {colorSelect && (
//                   <PopUp
//                     handleClose={togglePopup}
//                     color={adminColor}
//                     setColor={setadminColor}
//                   />
//                 )}

//                 <Row className="d-flex justify-content-center align-items-center">
//                   <Col>
//                     <Input type="text" value={adminColor} disabled />
//                   </Col>
//                   <Col>
//                     <Button onClick={() => setColorSelect(!colorSelect)}>
//                       Select
//                     </Button>
//                   </Col>
//                 </Row>
//                 <h3 className=" pt-5">Customer Site Color</h3>
//                 <Row className="d-flex justify-content-center align-items-center">
//                   <Col>
//                     <Input type="text" value={customerColor} disabled />
//                   </Col>
//                   <Col>
//                     <Button onClick={() => setCustomerSelect(!customerSelect)}>
//                       Select
//                     </Button>
//                   </Col>
//                 </Row>
//                 {customerSelect && (
//                   <PopUp
//                     handleClose={togglePopupCustomer}
//                     color={customerColor}
//                     setColor={setCustomerColor}
//                   />
//                 )}

//                 <Button
//                   color="primary"
//                   className="mt-5 float-right mb-3"
//                   onClick={() => {
//                     let obj = {
//                       customerColor,
//                       adminColor,
//                     };
//                     if (obj) {
//                       dispatch(updateColors(user?.restaurantID, obj));
//                     }
//                   }}
//                 >
//                   Update
//                 </Button>
//               </div>
//             </Card>
//           )}
//           {/* <Card className="shadow">
//             <CardHeader className="d-lg-flex  d-sm-block justify-content-between">
//               <div className="d-flex align-items-center">
//                 <h3 className=" pt-2">Customization</h3>
//               </div>

//               <Button color="primary" onClick={addToggle}>
//                 Add
//               </Button>
//             </CardHeader>

//             <Table className="align-items-center table-flush" responsive>
//               <thead className="thead-light">
//                 <tr>
//                   <th scope="col">Image</th>
//                   <th scope="col">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data &&
//                   data.map((el, id) => {
//                     return (
//                       <tr key={id}>
//                         <th scope="row">
//                           <img src={el?.url} height={50} width={50} />
//                         </th>
//                         <td>
//                           <Button
//                             className="btn-sm"
//                             color="primary"
//                             onClick={() => {
//                               setIndex(id);
//                               setEditData(el);
//                               editToggle();
//                             }}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             className="btn-sm"
//                             color="danger"
//                             onClick={() => {
//                               setEditData(el);
//                               deleteToggle();
//                             }}
//                           >
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </Table>
//             <div className="pb-3 mt-4">
//               <h3 className="px-3">Replace Your logo</h3>
//               <div className="px-3" style={{ position: "relative" }}>
//                 {loading ? (
//                   <Spinner />
//                 ) : (
//                   <img
//                     alt="Card image cap"
//                     height={70}
//                     width={70}
//                     src={logo ? logo : defaultLogo}
//                   />
//                 )}

//                 <div className="d-flex justify-content-center align-items-center">
//                   {loading ? null : (
//                     <i
//                       class="fas fa-edit"
//                       onClick={() => {
//                         inputRef.current.click();
//                       }}
//                       style={{
//                         position: "absolute",
//                         left: "37px",
//                         bottom: "0px",
//                         padding: "5px",
//                         background: "black",
//                       }}
//                     ></i>
//                   )}
//                   <input
//                     type="file"
//                     hidden
//                     ref={inputRef}
//                     onChange={handleUpdateLogo}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="px-3">
//               <h3 className=" pt-2">Admin Color</h3>
//               {colorSelect && (
//                 <PopUp
//                   handleClose={togglePopup}
//                   color={adminColor}
//                   setColor={setadminColor}
//                 />
//               )}

//               <Row className="d-flex justify-content-center align-items-center">
//                 <Col>
//                   <Input type="text" value={adminColor} disabled />
//                 </Col>
//                 <Col>
//                   <Button onClick={() => setColorSelect(!colorSelect)}>
//                     Select
//                   </Button>
//                 </Col>
//               </Row>
//               <h3 className=" pt-5">Customer Site Color</h3>
//               <Row className="d-flex justify-content-center align-items-center">
//                 <Col>
//                   <Input type="text" value={customerColor} disabled />
//                 </Col>
//                 <Col>
//                   <Button onClick={() => setCustomerSelect(!customerSelect)}>
//                     Select
//                   </Button>
//                 </Col>
//               </Row>
//               {customerSelect && (
//                 <PopUp
//                   handleClose={togglePopupCustomer}
//                   color={customerColor}
//                   setColor={setCustomerColor}
//                 />
//               )}

//               <Button
//                 color="primary"
//                 className="mt-5 float-right mb-3"
//                 onClick={() => {
//                   let obj = {
//                     customerColor,
//                     adminColor,
//                   };
//                   if (obj) {
//                     dispatch(updateColors(user?.restaurantID, obj));
//                   }
//                 }}
//               >
//                 Update
//               </Button>
//             </div>
//           </Card> */}
//         </div>
//       </Row>
//     </>
//   );
// };

// export default CustomizationTable;
