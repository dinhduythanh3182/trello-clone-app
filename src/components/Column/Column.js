
import './Column.scss'
import Card from 'components/Card/Card'
import { sortOrder } from 'ultils/sort';

function Column({column}) {
    const cards = sortOrder(column.cards,column.cardOrder,'id')
    return ( 
        <div className="column">
            <header>{column.title}</header>
            <ul className="card-list">
                {cards.map((card,index)=> <Card key={index} card={card}/>)}           
                
            </ul>
            <footer>Another card</footer>
          </div>
     );
}

export default Column;