import React, {useEffect, useState, useCallback, useRef } from "react"
import { Draggable } from "react-beautiful-dnd"

function CardItem({ item, index, boardData, onDeleteCard }) {

  const [priority, setPriority] = useState(item.priority)

  const [showPriority, setShowPriority] = useState(false)

  const priorityRef = useRef()
  const priorityBtnRef = useRef()



  // Priority

  const showPriorityHandler = () => {
    setShowPriority(true)
    if(showPriority){
      setShowPriority(false)
    }
  }

  // Close priority dropdowns on outside click
  const closeOpenPriorities = useCallback(e => {
    if (priorityRef.current && showPriority && !priorityRef.current.contains(e.target) && !priorityBtnRef.current.contains(e.target)) {
      setShowPriority(false)
    }
  }, [showPriority])

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenPriorities)
  }, [closeOpenPriorities])

  const changePriority = pr => {
    const dataHolder = boardData
    dataHolder.forEach(el => {
      el.items.map(el2 => {
        if(item.id === el2.id){
          switch (pr) {
            case 0:
              setPriority(0)
              el2.priority = 0
              if(typeof window !== 'undefined'){
                const temp = JSON.stringify(dataHolder)
                localStorage.setItem('data', temp)
              }
              setShowPriority(false)
              break
            case 1:
              setPriority(1)
              el2.priority = 1
              if(typeof window !== 'undefined'){
                const temp = JSON.stringify(dataHolder)
                localStorage.setItem('data', temp)
              }
              setShowPriority(false)
              break
            case 2:
              setPriority(2)
              el2.priority = 2
              if(typeof window !== 'undefined'){
                const temp = JSON.stringify(dataHolder)
                localStorage.setItem('data', temp)
              }
              setShowPriority(false)
              break
          
            default:
              break
          }
        }
      })
    })
  }

  return (
    <Draggable index={index} draggableId={item.id.toString()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card ${snapshot.isDragging && 'dragging'}`}
        >
          <div className="card-inner">
            <button ref={priorityBtnRef} onClick={showPriorityHandler} className={`card-label test ${priority === 0 ? "priority-0" : priority === 1 ? "priority-1" : "priority-2"}`}>
                {priority === 0
                  ? "Low Priority"
                  : priority === 1
                  ? "Medium Priority"
                  : "High Priority"}
            </button>
            <div className={`prority-dropdown ${showPriority && 'p-visible'}`} ref={priorityRef}>
              <button className="card-label priority-0" onClick={() => changePriority(0)}></button>
              <button className="card-label priority-1" onClick={() => changePriority(1)}></button>
              <button className="card-label priority-2" onClick={() => changePriority(2)}></button>
            </div>

            <h5 className="card-title">{item.title}</h5>
            <button className="card-trash" onClick={() => onDeleteCard(item.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>

        </div>
        
      )}
    </Draggable>
  );
}

export default CardItem;
