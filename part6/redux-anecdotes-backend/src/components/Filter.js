import React from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        props.addFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <h2>Anecdotes</h2>
      filter <input onChange={handleChange} />
    </div>
  )
}


export default connect(
  null,
  { addFilter }
)(Filter)