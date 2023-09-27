import React, { useEffect, useState } from 'react'
// reactstrap components
import { Container } from 'reactstrap'
// core components
import OnlyHeader from '../components/Headers/OnlyHeader.js'
import CatalogTable from '../components/Catalog/CatalogTable'
import AddCatalogModal from '../components/Modals/AddCatalogModal'
import DeleteCatalogModal from '../components/Modals/DeleteCatalogModal'
import EditCatalogModal from '../components/Modals/EditCatalogModal'
import { useDispatch, useSelector } from 'react-redux'
import { getCatalogsByID } from '../store/actions/catalogAction'

const Catalog = () => {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editData, setEditData] = useState('')
  const [id, setId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const { user } = useSelector(state => state.auth)
  const { catalogs } = useSelector(state => state.catalog)

  const dispatch = useDispatch()

  const addToggle = () => {
    setAddModal(!addModal)
  }
  const editToggle = () => {
    setEditModal(!editModal)
  }
  const deleteToggle = () => {
    setDeleteModal(!deleteModal)
  }
  // const data = [
  //   {
  //     category: "Breakfast",
  //     startTime: "8.00 AM",
  //     endTime: "10.00 AM",
  //     availability: "available every day",
  //   },
  //   {
  //     category: "lunch",
  //     startTime: "12.00 PM",
  //     endTime: "3.00 PM",
  //     availability: "available every day",
  //   },
  //   {
  //     category: "Dinner",
  //     startTime: "7.00 PM",
  //     endTime: "3.00 PM",
  //     availability: "available every day",
  //   },
  // ];
  useEffect(() => {
    dispatch(getCatalogsByID(user?.restaurantID))
  }, [])

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <CatalogTable
          data={catalogs}
          addToggle={addToggle}
          editToggle={editToggle}
          deleteToggle={deleteToggle}
          setEditData={setEditData}
          setId={setId}
        />

        <AddCatalogModal addModal={addModal} addToggle={addToggle} />

        <EditCatalogModal
          editModal={editModal}
          editToggle={editToggle}
          editData={editData}
          id={id}
        />
        <DeleteCatalogModal
          deleteModal={deleteModal}
          deleteToggle={deleteToggle}
          title={'Catalog'}
          id={id}
        />
      </Container>
    </>
  )
}

export default Catalog
