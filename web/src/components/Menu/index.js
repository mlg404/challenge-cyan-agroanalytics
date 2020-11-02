import React from 'react';
import { FaRegMap, FaRegListAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logoImg from '../../images/logo.png'

import './styles.css';

function Menu() {
  return (
    <aside>
    <header>
      <img src={logoImg} alt=""/>

      <main>
        <Link to ="/">
          <div>
            <FaRegMap size={40} />
            <span>Map</span>
          </div>
        </Link>
        <Link to ="/">
          <div>
            <FaRegListAlt size={40} />
            <span>List</span>
          </div>
        </Link>
        <Link to ="/add">
          <div>
            <FaPlus size={40}/>
            <span>Add</span>
          </div>
        </Link>
      </main>

      
    </header>

    <footer>
      
    </footer>
  </aside>
  );
}

export default Menu;