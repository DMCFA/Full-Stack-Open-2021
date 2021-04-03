import React from 'react'

const Filter = ({searchKey, changeSearch}) => {
    return (
        <div>
            Filter shown with <input
            type='text' placeholder='Search..' value={searchKey} onChange={changeSearch}>
            </input>
        </div>
    )
}


export default Filter