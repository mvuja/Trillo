import { useState } from 'react';

// custom hooks
import createGuidId from '../hooks/GuiId'


const Header = ({setBoardData}) => {

    const [addNewInput, setAddNewInput] = useState('')

    const changeAddNewInput = e => setAddNewInput(e.target.value)

    const addColumn = e => {
      e.preventDefault()
      if(addNewInput.trim() !== ''){
        setBoardData(prevdata => {
          return(
            [
              ...prevdata,
              {
                "id": createGuidId(),
                "name": addNewInput,
                "items": []
              }
            ]
          )
        })
      }
      setAddNewInput('')
    }

    return ( 
    <div className="header">
        <div className="flex items-center">
          <h4 className="header-title">Trillo Board</h4>
        </div>
        <div className="add-new-container">
          <form onSubmit={addColumn} className='flex gap-3'>
            <input type="text" onChange={changeAddNewInput} value={addNewInput} className='input' />
            <button className='btn'>Add list</button>
          </form>
        </div>
    </div>
    )
}
 
export default Header