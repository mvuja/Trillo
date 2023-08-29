import React, {useEffect, useState, useCallback, useRef } from "react"
import { Draggable } from "react-beautiful-dnd"

function CardItem({ data, index }) {

  const [priority, setPriority] = useState(data.priority)
  const [showPriority, setShowPriority] = useState(false)

  const priorityRef = useRef()
  const priorityBtnRef = useRef()

  // Close priority dropdowns on outside click
  const closeOpenPriorities = useCallback(e => {
    if (priorityRef.current && showPriority && !priorityRef.current.contains(e.target) && !priorityBtnRef.current.contains(e.target)) {
      setShowPriority(false)
    }
  }, [showPriority])
  useEffect(() => {
    document.addEventListener("mousedown", closeOpenPriorities)
  }, [closeOpenPriorities])


  const showPriorityHandler = (e) => {
    setShowPriority(true)
    if(showPriority){
      setShowPriority(false)
    }
    console.log(e.target);
  }

  const changePriority = pr => {
    switch (pr) {
      case 0:
        setPriority(0)
        setShowPriority(false)
        break
      case 1:
        setPriority(1)
        setShowPriority(false)
        break
      case 2:
        setPriority(2)
        setShowPriority(false)
        break
    
      default:
        break
    }
  }

  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card ${snapshot.isDragging && 'dragging'}`}
        >
          <button ref={priorityBtnRef} onClick={showPriorityHandler} className={`card-label test ${priority === 0 ? "priority-0" : priority === 1 ? "priority-1" : "priority-2"}`}>
              {priority === 0
                ? "Low Priority"
                : priority === 1
                ? "Medium Priority"
                : "High Priority"}
          </button>
          <div className={`prority-dropdown ${showPriority && 'p-visible'}`} ref={priorityRef}>
            <button className="card-label priority-0" onClick={e => changePriority(0)}></button>
            <button className="card-label priority-1" onClick={e => changePriority(1)}></button>
            <button className="card-label priority-2" onClick={e => changePriority(2)}></button>
          </div>

          <h5 className="card-title">{data.title}</h5>
        </div>
        
      )}
    </Draggable>
  );
}

export default CardItem;
