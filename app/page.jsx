'use client'
import BoardData from "./data/board-data.json"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useEffect, useRef, useState } from "react"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Header from "./components/Header"
import CardItem from "./components/CardItem"
import EditCardModal from "./components/EditCardModal"

// custom hooks
import createGuidId from './hooks/GuiId'

export default function Home() {
  const [text, setText] = useState('')
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState(getInitialData())
  const [showForm, setShowForm] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(0)

  // EDITING BOARD NAME
  const [editingBoardName, setEditingBoardName] = useState(false)
  const [editingBoardInput, setEditingBoardInput] = useState('')
  const [selectedBoardForEditing, setSelectedBoardForEditing] = useState(0)

  // EDITING CARD
  const [showEditModal, setShowEditModal] = useState(false)
  const [editInput, setEditInput] = useState('')
  const [editID, setEditID] = useState()


  // TOAST NOTIFICATION
  const notify = txt => toast(txt, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })


  // INITIAL LOAD

  useEffect(() => {
    if (process.browser) {
      setReady(true)
    }
  }, [])

  
  // LOCAL STORAGE

  function getInitialData() {
    if(typeof window !== 'undefined'){
      const temp = localStorage.getItem('data')
      const savedData = JSON.parse(temp)
      return savedData || BoardData
    }
  }
  useEffect(() => {
      if(typeof window !== 'undefined'){
        const temp = JSON.stringify(boardData)
        localStorage.setItem('data', temp)
      }
  })

  
  const onDragEnd = re => {
    if (!re.destination) return
    let newBoardData = boardData
    const dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
      newBoardData[parseInt(re.source.droppableId)].items.splice(re.source.index, 1)
      newBoardData[parseInt(re.destination.droppableId)].items.splice(re.destination.index, 0, dragItem)
    // setBoardData(newBoardData)
    if(typeof window !== 'undefined'){
      const temp = JSON.stringify(newBoardData)
      localStorage.setItem('data', temp)
    }
  }


  // ADD CARD

  const onAddCard = e => {
    // if(e.keyCode === 13) //Enter
    // {
      const val = text
      if(val.length === 0) {
        setShowForm(false)
      }
      else {
        const boardId = e.target.attributes['data-id'].value
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat:0,
          attachment: 0,
          assignees: []
        }
        let newBoardData = boardData
        newBoardData[boardId].items.push(item)
        setBoardData(newBoardData)
        setShowForm(false)
        setText('')
        notify('Task successfully created!')
      }
    // }
  }


  // DELETE CARD

  const onDeleteCard = id => {
    const test = boardData.map(el => {
      const newFilter = el.items.filter(el2 => {
        return el2.id !== id
      })
      el.items = newFilter
      return el
    })
    setBoardData(test)
    notify('Task successfully deleted!')
  }



  // EDIT CARD NAME

  const onEditCard = (id, title) => {
    setShowEditModal(true)
    setEditInput(title)
    setEditID(id)
  }

  const editCardHandler = e => {
    e.preventDefault()
    console.log(editInput);
    if(editInput.trim() !== ''){
      const test = boardData.map(el => {
        const newFilter = el.items.map(el2 => {
          if(el2.id === editID){
            el2.title = editInput
          }
          return el2
        })
        el.items = newFilter
        return el
      })
      setBoardData(test)
      setShowEditModal(false)
      notify('Task successfully edited!')
    }

  }



  // EDIT BOARD NAME

  const changeColumnName = (boardId, boardName) => {
    setEditingBoardName(true)
    setSelectedBoardForEditing(boardId)
    setEditingBoardInput(boardName)
  }

  const editingBoardInputChange = (e, boardId) => {
    setEditingBoardInput(e.target.value)
    const newBoard = boardData.map(el => {
      if(el.id === boardId){
        el.name = e.target.value
      }
      return el
    })
    setBoardData(newBoard)
  }

  const closeBoardEditing = () => {
    setEditingBoardName(false)
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter' || e.key === "Escape"){
      setEditingBoardName(false)
    }
  }

  
  return (
    <main>
      <ToastContainer />
      <div className="flex flex-col h-screen">
          <Header setBoardData={setBoardData} notify={notify} />

        <div className="relative h-full mt-11">

          {/* EDIT CARD */}

          <EditCardModal
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
            editInput={editInput}
            setEditInput={setEditInput}
            editCardHandler={editCardHandler}
          />


          {/* Board columns */}
          {ready && (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="overflow-x-auto overflow-y-auto inset-0 absolute whitespace-nowrap select-none">
                {boardData.map((board, bIndex) => {
                  return (
                    <div key={board.id} className="w-96 whitespace-nowrap align-top h-full inline-block mx-2 first:ml-4 md:first:ml-10 last:mr-4 md:last:mr-10">
                      <div className="column">
                        <span className="column-top-bar"></span>
                        <h4 className="column-title" onDoubleClick={() => changeColumnName(board.id, board.name)}>
                          {editingBoardName && selectedBoardForEditing === board.id
                            ?
                            <div className="board-edit-container">
                              <input type="text" className="editing-board-name" value={editingBoardInput} onChange={(e) => editingBoardInputChange(e, board.id)} onKeyDown={handleKeyPress} />
                              <button onClick={closeBoardEditing}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                              </button>
                            </div>
                            :
                            <span>
                              {board.name}
                            </span>
                          }
                        </h4>
                        <Droppable droppableId={bIndex.toString()}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              <div className={` ${snapshot.isDraggingOver && "dragging-over"}`}>
                                <div className="overflow-y-auto overflow-x-hidden h-auto"
                                style={{maxHeight:'calc(100vh - 290px)'}}>
                                  {board.items.length > 0 &&
                                    board.items.map((item, iIndex) => {
                                      return (
                                        <CardItem
                                          boardData={boardData}
                                          onDeleteCard={onDeleteCard}
                                          onEditCard={onEditCard}
                                          key={item.id}
                                          item={item}
                                          index={iIndex}
                                          className="m-3"
                                        />
                                      );
                                    })}
                                  {provided.placeholder}
                                </div>
                                {
                                  showForm && selectedBoard === bIndex ? (
                                    <div className="p-3">
                                      <textarea
                                        className="textarea" 
                                        rows={3}
                                        placeholder="Task info"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                      />
                                      <button className="btn w-full" data-id={bIndex} onClick={(e) => onAddCard(e)}>Add task</button>
                                    </div>
                                  ): (
                                    <button className="add-task" onClick={() => {setSelectedBoard(bIndex); setShowForm(true);}}>
                                      <span>Add task</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    </button>
                                  )
                                }
                              </div>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DragDropContext>
          )}
        </div>
      </div>
    </main>
  )
}
