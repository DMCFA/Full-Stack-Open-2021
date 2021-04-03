import React from 'react'

const Person = ({addName, newName, changeName, newNumber, changeNumber}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input 
                value={newName}
                onChange={changeName} />
            </div>
            <div>
                number: <input 
                value={newNumber}
                onChange={changeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default Person