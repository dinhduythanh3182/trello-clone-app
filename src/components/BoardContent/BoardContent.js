import { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash'

import { sortOrder } from 'utils/sort';
import { applyDrag } from 'utils/dragDrop'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import initialData from 'actions/initialData'

function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    useEffect(()=>{
        const boardFromDB = initialData.boards.find(board=>board.id === 'board-1');
        if(boardFromDB){
            setBoard(boardFromDB);
            setColumns(sortOrder(boardFromDB.columns,boardFromDB.columnOrder,"id"))
        }
    },[])
    if(isEmpty(board)){
        return <div>Not Found</div>
    }
    const onColumnDrop = (dropResult) => {
        let newBoard = Object.assign({},board)
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns,dropResult)
        newBoard.columnOrder = newColumns.map(column=>column.id)
        newBoard.columns = newColumns
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
    return ( 
        <div className="board-content">
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
                    <Column  column={column} onCardDrop={onCardDrop}/>
                </Draggable>
                )}
            </Container>
                <div className="add-new-column">
                    <i className="fa-solid fa-plus icon"></i>Add another column
                </div>
        </div>
     );
}

export default BoardContent;