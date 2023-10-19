import { useState, useEffect } from 'react';


const EditCardModal = ({ setShowEditModal, showEditModal, editInput, setEditInput, editCardHandler }) => {

    

    return (
        <>
        {
            showEditModal ?
            <div className="edit-card-container">
                <div className="bg-blur" onClick={() => setShowEditModal(false)}></div>
                <form onSubmit={editCardHandler}>
                    <textarea cols="30" rows="4" className='input' value={editInput} onChange={(e) => setEditInput(e.target.value)}></textarea>
                    <button className="btn">Edit card</button>
                </form>
            </div>
            :
            <div></div>
        }
        </>


    )
}
 
export default EditCardModal