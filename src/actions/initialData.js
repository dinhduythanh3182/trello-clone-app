const initialData = {
    boards : [
        {
            id: 'board-1',
            columnOrder : ['column-1','column-2','column-3'],
            columns : [
                {
                    id: 'column-1',
                    boardId : 'board-1',
                    title : 'Todo 1',
                    cardOrder : ['card-1','card-2','card-3','card-4'],
                    cards : [
                        {
                            id : 'card-1',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 1',
                            cover : null
                        },
                        {
                            id : 'card-2',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 2',
                            cover : "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg"
                        },
                        {
                            id : 'card-3',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 3',
                            cover : "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg"
                        },
                        {
                            id : 'card-4',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 4',
                            cover : null
                        },
                        
                    ]
                },
                {
                    id: 'column-2',
                    boardId : 'board-1',
                    title : 'Todo 2',
                    cardOrder : ['card-5','card-6','card-7'],
                    cards : [
                        {
                            id : 'card-1',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 5',
                            cover : null
                        },
                        {
                            id : 'card-2',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 6',
                            cover : "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg"
                        },
                        {
                            id : 'card-3',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 7',
                            cover : null
                        },

                    ]
                },
                {
                    id: 'column-3',
                    boardId : 'board-1',
                    title : 'Todo 3',
                    cardOrder : ['card-8','card-9'],
                    cards : [
                        {
                            id : 'card-8',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 8',
                            cover : null
                        },
                        {
                            id : 'card-9',
                            boardId : 'board-1',
                            columnId : 'column-1',
                            title : 'Title of card 9',
                            cover : "https://kjvc.com.vn/uploads/plugin/news/2018/07/1611805120-8126.jpg",
                        },
                    ]
                }
            ]
        }
    ]
};

export default initialData