import { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { isEmpty } from 'lodash'

import { sortOrder } from 'utils/sort';
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
        console.log(dropResult);
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
                    <Column  column={column}/>
                </Draggable>
                )}
            </Container>
        </div>
     );
}

export default BoardContent;