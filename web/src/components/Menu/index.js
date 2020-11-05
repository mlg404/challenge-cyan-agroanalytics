import React, { useState}  from 'react';
import { FaRegMap, FaPlus, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer'

import logoImg from '../../images/logo.png'

import './styles.css';

function Menu() {
  const [showMenu, setShowMenu] = useState(1);

  const variants = {
    open: { left: 0 },
    closed: { left: "-300px" },
  }
  return (
    <>
      <motion.aside
        animate={showMenu ? "open" : "closed"}
        variants={variants}
      >
        <header>
          <img src={logoImg} alt=""/>

          <main>
            <Link to ="/">
              <div>
                <FaRegMap size={40} />
                <span>Map</span>
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
      </motion.aside>
      <div className="open-menu" >
        <div className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          { showMenu ? 
            <FaTimes size={24} color="#BBB5BD"/>
            :
            <FaBars size={24} color="#BBB5BD"/>
          }

        </div>
      </div>
    </>
  );
}

export default Menu;