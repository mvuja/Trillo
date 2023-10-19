import { useState, useEffect } from 'react';

// custom hooks
import createGuidId from '../hooks/GuiId'


const Header = ({ setBoardData, notify }) => {

    const [addNewInput, setAddNewInput] = useState('')
    const [dark, setDark] = useState(false)

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
        notify('Column successfully created!')
      }
      setAddNewInput('')
    }

    const darkToggle = () => {
      document.body.classList.toggle('dark')
      if(dark){
        setDark(false)
      }else{
        setDark(true)
      }
    }

    return ( 
    <div className="header">
        <div className="flex items-center mr-auto">
          <h4 className="header-title">Trillo Board</h4>
        </div>
        <div className="add-new-container">
          <form onSubmit={addColumn} className='flex gap-3'>
            <input type="text" onChange={changeAddNewInput} value={addNewInput} className='input' />
            <button className='btn'>Add list</button>
          </form>
        </div>
        <button className="dark-toggle" onClick={darkToggle}>
          {
            !dark ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          }
        </button>
    </div>
    )
}
 
export default Header