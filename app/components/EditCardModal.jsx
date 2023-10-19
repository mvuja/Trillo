import { useState, useEffect } from 'react';


const EditCardModal = ({ setShowEditModal, showEditModal, editInput, setEditInput, editCardHandler }) => {

    

    return (
        <>
        {
            showEditModal &&
            <div className="edit-card-container">
                <div className="bg-blur" onClick={() => setShowEditModal(false)}></div>
                <form onSubmit={editCardHandler}>
                    <button onClick={() => setShowEditModal(false)} className='close-modal-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    <textarea cols="30" rows="4" className='input' value={editInput} onChange={(e) => setEditInput(e.target.value)}></textarea>
                    <button className="btn">Edit task</button>
                </form>
            </div>
        }
        </>


    )
}
 
export default EditCardModal