import { useState, useEffect, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash'

import { sortOrder } from 'utils/sort';
import { applyDrag } from 'utils/dragDrop'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import initialData from 'actions/initialData'
import useMountTransition from 'actions/useMountTransition'
function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [isColumnFormOpen,setIsColumnFormOpen] = useState(false)
    const [newColumnTitle,setNewColumnTitle] = useState("")
    const hasTransitionedIn = useMountTransition(isColumnFormOpen, 500);

    const newColumnInputRef = useRef(null)
    const boardContentRef = useRef(null)
    const addColumnRef = useRef(null)

    useEffect(()=>{
        const boardFromDB = initialData.boards.find(board=>board.id === 'board-1');
        if(boardFromDB){
            setBoard(boardFromDB);
            setColumns(sortOrder(boardFromDB.columns,boardFromDB.columnOrder,"id"))
        }
    },[])

    useEffect(() => {
        if(isColumnFormOpen && newColumnInputRef.current){
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    },[isColumnFormOpen])

    
    if(isEmpty(board)){
        return <div>Not Found</div>
    }
    const onColumnDrop = (dropResult) => {
        let newBoard = Object.assign({},board)
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns,dropResult)
        newBoard.columnOrder = newColumns.map(column=>column.id)
        newBoard.columns = newColumns
        console.log(newColumns);
        setColumns(newColumns)
        setBoard(newBoard)
    }
    const onCardDrop = (id,dropResult) => {
        if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
            let newColumns = [...columns]
            let currentColumn = newColumns.find(column=> column.id === id)
            currentColumn.cards = applyDrag(currentColumn.cards,dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(card=>card.id)
            setColumns(newColumns)
        }
    }
    const handleToggleAddColumn = (e)=>{
        setIsColumnFormOpen(prev=>!prev)
    }
    const handleCloseAddCol = (e)=>{
        if(e.target.closest('.add-column-container')!==addColumnRef.current){
            setIsColumnFormOpen(false)
        }
    }
    const addNewColumn = (e) => {
        if(newColumnTitle){
            newColumnInputRef.current.focus()
        }
        if(newColumnTitle.trim()!==""){
            const newColumnToAdd = {
                id: "fgfgfg",
                boardId : board.id,
                title : newColumnTitle.trim(),
                cardOrder :[],
                cards : []
            }
            let newColumns = [...columns]
            let newBoard = Object.assign({},board)
            newColumns.push(newColumnToAdd)
            newBoard.columns= newColumns
            setColumns(newColumns)
            setBoard(newBoard)
            setNewColumnTitle('')
        }       
    }
    const onUpdateColumn =(newColumnUpdate)=>{
        const idColumn = newColumnUpdate.id
        let newColumns = [...columns]
        const indexColumn = newColumns.findIndex(column=>column.id === idColumn)
        if(newColumnUpdate._deleted){
            newColumns = newColumns.filter(column=>column.id !== idColumn)
        }
        else{
            newColumns.splice(indexColumn, 1, newColumnUpdate)
        }   
        let newBoard = Object.assign({},board)
        newBoard.columns= newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }
    return ( 
        <div className="board-content"
            onClick = {handleCloseAddCol}
            ref={boardContentRef}
        >   
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                dragHandleSelector=".column-drag-handle"
                getChildPayload={index=> columns[index]}
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
                >
                {columns.map((column,index)=> 
                <Draggable key={index} >
                    <Column  column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn}/>
                </Draggable>
                )}
            </Container>
            <div className="add-column-container"
                ref={addColumnRef}
            >
                {(!isColumnFormOpen) && <div className={`add-new-column ${ !isColumnFormOpen?'show':""}`}
                    onClick={handleToggleAddColumn}
                >
                    <i className="fa-solid fa-plus icon"></i>Add another column
                </div>}

                {(hasTransitionedIn || isColumnFormOpen) && <div className={`enter-new-column ${hasTransitionedIn && 'in'} ${ isColumnFormOpen && 'show'}`}>
                        <input type="text" 
                                placeholder='Enter column title'
                                className="input-enter"
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onKeyDown={e=>
                                    e.key==="Enter" && addNewColumn()
                                }
                                onChange={e=>setNewColumnTitle(e.target.value)}
                        />
                        <button className="add-column-btn"
                                onClick={addNewColumn}
                        >
                                Add list
                        </button>
                        <span className="cancel-btn"
                                onClick={handleToggleAddColumn}
                        >
                                <i className="fa-solid fa-x icon"></i>
                            </span>
                </div>}
            </div>
        </div>
     );
}

export default BoardContent;