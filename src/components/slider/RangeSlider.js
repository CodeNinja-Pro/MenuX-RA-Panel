import ReactSlider from 'react-slider'
import { Input } from 'reactstrap'

const RangeSlider = ({ value, setValue, setCurrentPage }) => {
  return (
    <>
      <div className='slider-div'>
        <Input type='text' value={value[0]} disabled />
        <ReactSlider
          value={value}
          onChange={(value, index) => {
            setCurrentPage(0)
            setValue(value, index)
          }}
          onAfterChange={(value, index) => {
            setCurrentPage(0)
            setValue(value, index)
          }}
          className='horizontal-slider'
          thumbClassName='example-thumb'
          trackClassName='example-track'
          renderThumb={(props, state) => <div {...props}></div>}
        />
        <Input type='text' value={value[1]} disabled />
      </div>
    </>
  )
}

export default RangeSlider
