import PieChart from '../Charts/PieChart'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Card,
  Container
} from 'reactstrap'
import { getCustomersDemographics } from '../../store/actions/statsActions'

function GenderDistributionModal ({ genderModal, genderToggle }) {
  const dispatch = useDispatch()
  const { uid } = useSelector(state => state.auth)
  const { customerDemographics } = useSelector(state => state.stats)
  const chartOptions = {
    chart: {
      type: 'pie'
    },
    colors: ['#82ca9d', '#ADD8E6'],

    fill: {
      colors: ['#82ca9d', '#ADD8E6']
    },
    labels: ['Females', 'Males']
  }

  // const chartSeries = [
  //   customerDemographics?.femalePercentage,
  //   customerDemographics?.malePercentage,
  // ];

  const chartSeries = [76, 24]

  useEffect(() => {
    // dispatch(getCustomersDemographics(uid))
  }, [])

  return (
    <div>
      <Modal isOpen={genderModal}>
        <ModalHeader toggle={genderToggle}>Customer Demographics</ModalHeader>
        <ModalBody>
          <Container>
            {' '}
            <Row>
              <Col>
                <Card className='shadow mt-3'>
                  <PieChart
                    chartOptions={chartOptions}
                    chartSeries={chartSeries}
                    type='pie'
                  />
                </Card>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default GenderDistributionModal
