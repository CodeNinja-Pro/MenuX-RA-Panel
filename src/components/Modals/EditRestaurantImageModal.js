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
import { updateRestaurantImage } from '../../store/actions/settingAction'
const EditRestaurantImageModal = ({
  editModal,
  editToggle,
  editData,
  index
}) => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.catalog)
  const { uid } = useSelector(state => state.auth)
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  const handleImage = e => {
    setImage(e.target.files[0])
    const [file] = e.target.files
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    if (image == '') {
      toast.warn('please Select Image', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } else {
      dispatch(
        updateRestaurantImage(uid, index, image, editData, () => {
          editToggle()
        })
      )
    }
  }

  return (
    <div>
      <Modal isOpen={editModal}>
        <ModalHeader toggle={editToggle}>Edit Restaurant Image</ModalHeader>
        <ModalBody className='pt-0'>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Restaurant Image</Label>
              <Input
                type='file'
                accept='image/*'
                onChange={e => {
                  handleImage(e)
                }}
              />
            </FormGroup>
            <Row>
              <Col md={3}>
                {imagePreview ? (
                  <img
                    height={100}
                    width={100}
                    src={imagePreview}
                    alt='no image found'
                  />
                ) : (
                  <img
                    height={100}
                    width={100}
                    src={editData}
                    alt='no image found'
                  />
                )}
              </Col>
            </Row>
            <div className='d-flex justify-content-end'>
              <Button color='primary' type='submit' disabled={loading}>
                {loading ? <Spinner size='sm' /> : 'Update'}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditRestaurantImageModal
