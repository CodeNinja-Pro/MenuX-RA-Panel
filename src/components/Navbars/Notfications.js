import React from 'react'
import { Col, DropdownItem, Row } from 'reactstrap'
import moment from 'moment'
import { updateNotification } from '../../store/actions/RequestActions'
import { useDispatch } from 'react-redux'

const Notfications = ({ data }) => {
  const dispatch = useDispatch()
  return (
    <>
      {data.length > 1 ? (
        data.map(notif => {
          const timestamp = notif?.createdAt
          const unixTimestamp =
            timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
          const date = moment.unix(unixTimestamp / 1000)
          const formattedDateTime = date.format('MMM DD HH:mma')

          return (
            <DropdownItem>
              <Row className='d-flex '>
                <Col md={2}>
                  <span>
                    <img
                      className='avatar avatar-sm rounded-circle mt-1'
                      height='42px'
                      width='42px'
                    />
                  </span>
                </Col>

                <Col>
                  <span className='text-wrap mb-2 fs-14'>
                    <b>{notif?.userName}</b> {notif?.message}
                  </span>
                  <div className='d-flex justify-content-between fs-12 mt-2'>
                    <small>{formattedDateTime}</small>
                    {notif?.markAsRead !== true && (
                      <small
                        className='text-primary'
                        onClick={() => dispatch(updateNotification(notif.id))}
                      >
                        Mark as Read
                      </small>
                    )}
                  </div>
                </Col>
              </Row>
            </DropdownItem>
          )
        })
      ) : (
        <>
          {/* <Row className="justify-content-center py-4">No Notifcations</Row> */}
        </>
      )}
    </>
  )
}

export default Notfications
