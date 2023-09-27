import React from 'react'
import { DateRangePicker } from 'react-date-range'
import { Input } from 'reactstrap'
import moment from 'moment'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const PickDateRange = props => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const dateRangeString =
    props.datestate.length > 0
      ? `${moment(props.datestate[0].startDate).format(
          'DD MMM YYYY'
        )} - ${moment(props.datestate[0].endDate).format('DD MMM YYYY')}`
      : `${moment().format('DD MMM YYYY')} - ${moment().format('DD MMM YYYY')}`

  return (
    <div ref={ref}>
      <Input
        disabled={props.disabled}
        value={dateRangeString}
        className='pointer'
        onClick={() => setIsOpen(!isOpen)}
        // readOnly
      />
      {isOpen && (
        <DateRangePicker
          onChange={item => props.setDateState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={props.datestate}
          direction='horizontal'
          preventSnapRefocus={true}
          calendarFocus='backwards'
          className='dateRangerSet'
          minDate={props.minDate}
        />
      )}
    </div>
  )
}

export default PickDateRange
