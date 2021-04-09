import React from 'react'

const Filter = ({handleChange, searchKey}) => {
    return (
    <form style={{display: 'inline-block'}}>
        find countries <input
        type='text'
        value={searchKey}
        onChange={handleChange}>
        </input>
    </form>
    )
}

export default Filter