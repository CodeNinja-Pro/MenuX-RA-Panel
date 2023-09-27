import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Spinner
} from 'reactstrap'
import { addRestaurantImages } from '../../store/actions/settingAction'
import Dropzone from 'react-dropzone'

const AddRestaurantImageModal = ({
  addModal,
  addToggle,
  data,
  galleryImages,
  setGalleryImages
}) => {
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.catalog)

  const MAX_FILE_SIZE = 1024 * 1024

  const handleDrop = acceptedFiles => {
    let temp = []
    if (data?.length <= 4) {
      if (acceptedFiles.length <= 5) {
        acceptedFiles.forEach(file => {
          if (!file.type.startsWith('image/')) {
            toast.warn('Invalid file type. Only image files are allowed.', {
              style: {
                fontFamily: 'Poppins'
              }
            })
          } else if (file.size > MAX_FILE_SIZE) {
            toast.warn(`File size too large. Maximum allowed 1MB`, {
              style: {
                fontFamily: 'Poppins'
              }
            })
          } else {
            const tempObj = {
              image: file,
              imageUrl: URL.createObjectURL(file)
            }
            temp.push(tempObj)
          }
        })
      } else {
        toast.warn('Max 5 images can be selected', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      }
      setGalleryImages(temp)
    } else {
      toast.warn(
        'Max images allowed 5, please delete some existing images to proceed',
        {
          style: {
            fontFamily: 'Poppins'
          }
        }
      )
    }
  }

  const handleRemoveGalleryImage = ind => {
    let temp = galleryImages
    temp.splice(ind, 1)
    setGalleryImages([...temp])
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    if (galleryImages.length > 0) {
      // if (data.length <= 4) {
      dispatch(
        addRestaurantImages(uid, galleryImages, () => {
          addToggle()
          setGalleryImages([])
        })
      )
      // } else {
      //   toast.warn("Please remove the restaurant images first");
      // }
    } else {
      toast.warn('please Selected Images', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Restaurant Images</ModalHeader>
        <ModalBody className='pt-0'>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Restaurant Images</Label>
              <Dropzone onDrop={handleDrop} accept='image/*' multiple={true}>
                {({ getRootProps, getInputProps }) => (
                  <section
                    className='dropzone'
                    style={{
                      border: '1px solid',
                      height: '80px',
                      borderRadius: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className='text-center'>
                        Drag and drop some files here, or click to select files
                      </p>
                      <div className='d-flex justify-content-center mb-2'>
                        <i className='fas fa-upload fa-2x'></i>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </FormGroup>
            <Row>
              {galleryImages != ''
                ? galleryImages.map((obj, ind) => {
                    return (
                      <>
                        <Col md={3} key={ind}>
                          <img
                            height={100}
                            width={100}
                            src={obj.imageUrl}
                            alt='no image found'
                          />
                          <div
                            className='icon-delete-gallery'
                            onClick={() => {
                              handleRemoveGalleryImage(ind)
                            }}
                          >
                            <i
                              className='fa fa-minus-circle'
                              aria-hidden='true'
                            ></i>
                          </div>
                        </Col>
                      </>
                    )
                  })
                : ''}
            </Row>
            <div className='d-flex justify-content-end'>
              <Button color='primary' type='submit' disabled={loading}>
                {loading ? <Spinner size='sm' /> : 'Add'}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddRestaurantImageModal
