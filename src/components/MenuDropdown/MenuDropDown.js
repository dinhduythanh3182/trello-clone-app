import React from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!

import './MenuDropdown.scss'

function MenuDropdown(props) {
    const {toggleConfirmModal} = props
    return ( 
        <div className="menu-dropdown">
            <ul className="menu-list">
                <li className="menu-item">Add card</li>
                <li className="menu-item danger"
                    onClick ={toggleConfirmModal}
                >
                    Remove column
                </li>
            </ul>
        </div>
     );
}

export default MenuDropdown;
