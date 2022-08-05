import './Column.scss'
import Task from 'components/Task/Task'
function Column() {
    return ( 
        <div className="column">
              <header>
                  Brain
              </header>
              <ul className="task-list">
                <Task/>           
                <li className="task-item">Add what you like to notice</li>
                <li className="task-item">Add what you like to notice</li>
                <li className="task-item">Add what you like to notice</li>
                <li className="task-item">Add what you like to notice</li>
                <li className="task-item">Add what you like to notice</li>
                <li className="task-item">Add what you like to notice</li>
                <li className="task-item">Add what you like to notice</li>
              </ul>
              <footer>Another card</footer>
          </div>
     );
}

export default Column;