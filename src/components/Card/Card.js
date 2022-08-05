import './Card.scss'

function Card({card}) {
    return ( 
        <div className="card-item">
            {card.cover && <img className="card-cover" draggable="false" src={card.cover} alt="" /> }
            {card.title}
        </div>
     );
}

export default Card;