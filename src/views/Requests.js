// reactstrap components
import { Container } from 'reactstrap'
// core components
import OnlyHeader from '../components/Headers/OnlyHeader.js'
import RequestTable from '../components/Requests/RequestsTable'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests } from '../store/actions/RequestActions'

const Requests = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { restaurantRequests } = useSelector(state => state.requests)
  useEffect(() => {
    dispatch(getRequests(user?.restaurantID))
  }, [])
  return (
    <>
      <OnlyHeader />
      <Container className='mt--7' fluid>
        <Container fluid>
          <RequestTable data={restaurantRequests} />
        </Container>
      </Container>
    </>
  )
}

export default Requests
