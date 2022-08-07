import { Container, Draggable } from 'react-smooth-dnd';
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react/headless'; // different import path!


import MenuDropdown from 'components/MenuDropdown/MenuDropDown';
import './Column.scss'
import Card from 'components/Card/Card'
import { sortOrder } from 'utils/sort';
import Modal from 'components/Modal/Modal'
import {selectInlineTittle, handleColumnTitleOnEnter} from 'utils/handleContentEditable'

function Column({column,onCardDrop,onUpdateColumn}) {
    const [showModal,setShowModal] = useState(false)
    const [columnTitle,setColumnTitle] = useState(column.title)
    const cards = sortOrder(column.cards,column.cardOrder,'id')
    useEffect(()=>{
        setColumnTitle(column.title)
    },[column.title])

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
                <Tippy
                    delay= {[0,800]}
                    duration = {300}
                    placement= 'bottom'
                    hideOnClick={true}
                    trigger="click"
                    interactive={true}
                    render={attrs => (
                        <MenuDropdown toggleConfirmModal={toggleConfirmModal}/>
                      )}
                >
                    <div className="column-dropdown-actions">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </Tippy>
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
                
            </div>
            <footer >
                <div className="footer-actions">
                    <i className="fa-solid fa-plus icon"></i>Another card
                </div>
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