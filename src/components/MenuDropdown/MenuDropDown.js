import React from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './MenuDropdown.scss'

function MenuDropdown(props) {
    const {toggleConfirmModal, handleToggleAddCard} = props
    return (  
          <div
            
            onDragStart={e=>
               { e.preventDefault()
                e.stopPropagation()}
            }
          >
              <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn" size="sm">
                    </Dropdown.Toggle>
                    <Dropdown.Menu className = "menu-list">
                        <Dropdown.Item className = "menu-item"
                            onClick={handleToggleAddCard}
                        >
                            Add a new card
                        </Dropdown.Item>
                        <Dropdown.Item className = "menu-item">Something else</Dropdown.Item>
                        <Dropdown.Divider className = "item-divider"/>
                        <Dropdown.Item className = "menu-item"
                            onClick={toggleConfirmModal}
                        >
                            Delete this column
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> 
          </div>
     );
}

export default MenuDropdown;


 /* <ul className="menu-list">
                <li className="menu-item"
                    onClick={handleToggleAddCard}
                    >Add card
                </li>
                <li className="menu-item danger"
                    onClick ={toggleConfirmModal}
                >
                    Remove column
                </li>
            </ul> */