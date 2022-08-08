import { Container, Draggable } from 'react-smooth-dnd';
import { useState, useEffect, useRef } from 'react'
import { cloneDeep } from 'lodash'

import MenuDropdown from 'components/MenuDropdown/MenuDropDown';
import './Column.scss'
import Card from 'components/Card/Card'
import { sortOrder } from 'utils/sort';
import Modal from 'components/Modal/Modal'
import {selectInlineTittle, handleColumnTitleOnEnter} from 'utils/handleContentEditable'

function Column(props) {
    const {column,onCardDrop,onUpdateColumn,boardContentRef}= props
    const [showModal,setShowModal] = useState(false)
    const [columnTitle,setColumnTitle] = useState(column.title)
    const [isCardFormOpen,setIsCardFormOpen] = useState(false)
    const [cardTitle,setCardTitle] = useState("")

    const newCardInputRef = useRef(null)
    const addCardBtnRef = useRef(null)
    const cards = sortOrder(column.cards,column.cardOrder,'id')
    
    useEffect(()=>{
        setColumnTitle(column.title)
    },[column.title])

    useEffect(() => {
        if(isCardFormOpen && newCardInputRef.current){
            newCardInputRef.current.focus()
            newCardInputRef.current.select()
        }
    },[isCardFormOpen])
    
    useEffect(() => {
        boardContentRef.current.addEventListener('click',(e)=>{
            if(e.target.closest('.add-new-card-container')!==document.querySelector(".add-new-card-container")){
                setIsCardFormOpen(false)
            }
        })
    },[])

    const handleToggleAddCard = (e)=>{
        setIsCardFormOpen(prev=>!prev)
    }

    const toggleConfirmModal = () =>{
        setShowModal(prev=>!prev)
    }

    const onConfirmModal = () => {
        const newColumn = {
            ...column,
            _deleted : true,
        }
        onUpdateColumn(newColumn)
        toggleConfirmModal()
    }

    const handleColumnTitleChange = (e) => {
        setColumnTitle(e.target.value)
    }

    const handleColumnTitleBlur = (e) => {
        const newColumn = {
            ...column,
            title: columnTitle,
        }
        onUpdateColumn(newColumn)
    }

    const addNewCard = () => {
        if(cardTitle.trim()){
            let newCard = {
                id : Math.random(),
                boardId : column.boardId,
                columnId : column.id,
                title : cardTitle.trim(),
                cover : null,
            }
            let newColumn = cloneDeep(column)
            newColumn.cards.push(newCard)
            newColumn.cardOrder.push(newCard.id)
            onUpdateColumn(newColumn)
            let addCardBtn = addCardBtnRef.current
            if (addCardBtn) {
                console.log("hi");
                addCardBtn.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: "end"
                })
              }
            setCardTitle("")
        }
        newCardInputRef.current.focus()
    }

    return ( 
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <input type="text" 
                        className="title-editable"
                        value={columnTitle}
                        spellCheck="false"
                        onClick={selectInlineTittle}
                        onChange={handleColumnTitleChange}
                        onBlur = {handleColumnTitleBlur}
                        onKeyDown = {e=>handleColumnTitleOnEnter(e)}
                        onMouseDown={e=>e.preventDefault()} //Prevent select title when drag column
                    />
                </div>
                <div className="column-dropdown-actions">
                    <MenuDropdown toggleConfirmModal={toggleConfirmModal}
                        handleToggleAddCard={handleToggleAddCard}
                    />                   
                </div>

            </header>
            <div className="card-list">
                <Container
                    groupName="col"
                    onDrop={dropResult=>onCardDrop(column.id,dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"                                    
                    dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview ' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card,index)=> 
                        <Draggable key={index}>
                            <Card  card={card}/>
                        </Draggable>
                    )}           
                </Container>    
                {
                    isCardFormOpen && 
                    <div className="add-new-card-container">
                        <textarea name=""
                            type="text" 
                            placeholder='Enter a title for this card'
                            className="area-input-new-card"
                            rows="4"
                            resize={'none'}
                            ref={newCardInputRef}
                            value={cardTitle}
                            onKeyUp={e=>
                                e.key==="Enter" && addNewCard()
                            }
                            onChange={e=>setCardTitle(e.target.value)}
                        />
                        <button className="add-btn"
                            ref={addCardBtnRef}
                            onClick={addNewCard}
                            >
                                Add card
                        </button>
                        <span className="cancel-btn"
                                onClick={handleToggleAddCard}
                        >
                                <i className="fa-solid fa-x icon"></i>
                        </span>
                    </div>
                }
            </div>
            <footer >
                {   
                    !isCardFormOpen && 
                        <div className="footer-actions"
                            onClick={handleToggleAddCard}
                        >
                            <i className="fa-solid fa-plus icon"></i>Another card
                        </div>
                }
            </footer>
            {showModal && <Modal
                content={`Are you sure want to remove ${column.title} ?`}
                title="Remove Column"
                toggleConfirmModal={toggleConfirmModal}
                onConfirmModal={onConfirmModal}
            />}
        </div>
     );
}

export default Column;