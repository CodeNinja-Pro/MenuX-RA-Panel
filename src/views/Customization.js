import CustomizationTable from '../components/Customization/CustomizationTable'
import OnlyHeader from '../components/Headers/OnlyHeader'
import AddRestaurantImageModal from '../components/Modals/AddRestaurantImageModal'
import DeleteRestaurantImageModal from '../components/Modals/DeleteRestaurantImageModal'
import EditRestaurantImageModal from '../components/Modals/EditRestaurantImageModal'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'reactstrap'

const Customization = () => {
  const { user, uid } = useSelector(state => state.auth)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editData, setEditData] = useState('')
  const [index, setIndex] = useState('')

  const addToggle = () => {
    setAddModal(!addModal)
  }
  const editToggle = () => {
    setEditModal(!editModal)
  }
  const deleteToggle = () => {
    setDeleteModal(!deleteModal)
  }
  return (
    <>
      <OnlyHeader />
      <Container>
        <Container className='mt--7' fluid>
          <CustomizationTable
            data={user?.restaurantImages ? user?.restaurantImages : []}
            addToggle={addToggle}
            editToggle={editToggle}
            deleteToggle={deleteToggle}
            setEditData={setEditData}
            setIndex={setIndex}
          />
        </Container>
        <AddRestaurantImageModal addModal={addModal} addToggle={addToggle} />

        <EditRestaurantImageModal
          editModal={editModal}
          editToggle={editToggle}
          editData={editData}
          index={index}
        />
        <DeleteRestaurantImageModal
          deleteModal={deleteModal}
          deleteToggle={deleteToggle}
          editData={editData}
          id={uid}
          title={'Image'}
        />
      </Container>
    </>
  )
}

export default Customization
