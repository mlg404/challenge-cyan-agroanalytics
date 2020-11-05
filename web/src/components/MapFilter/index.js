import React, {useState} from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { motion } from 'framer'

import './styles.css';

function MapFilter({ submitFc }) {
  const [showFilters, setShowFilters] = useState(0);
  const variants = {
    open: { right: 20 },
    closed: { right: "-300px" },
  }

  return (
    <>
    <button className="filter-button" onClick={() => setShowFilters(1)} >
      <FaFilter size={24} color="#BBB5BD"/>
    </button>

    <motion.div 
      animate={showFilters ? "open" : "closed"}
      variants={variants}
      className="filter-content"
    >
      <div className="filter-header">
        <h1>Filters</h1>
        <FaTimes onClick={() => setShowFilters(0)} size={24} color="#333"/>

      </div>
      <Accordion>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Mills</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <form onSubmit={submitFc}>
              <label>Name</label>
              <input name="name" type="text"/>
              <input name="type" value="mills" type="hidden"/>
              <button>Enviar</button>
            </form>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Harvests</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <form onSubmit={submitFc}>
              <label>Code</label>
              <input name="code" type="text"/>
              
              <label>Start date</label>
              <input name="start_date" type="date"/>

              <label>End date</label>
              <input name= "end_date" type="date"/>
              <input name="type" value="harvests" type="hidden"/>

              <button>Enviar</button>
            </form>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Farms</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <form onSubmit={submitFc}>
              <label>Code</label>
              <input name="code" type="text"/>

              <label>Name</label>
              <input name="name" type="text"/>
              <input name="type" value="farms" type="hidden"/>

              <button>Enviar</button>

            </form>
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>Fields</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <form onSubmit={submitFc}>
              <label>Code</label>
              <input name="code" type="text"/>
              <input name="type" value="fields" type="hidden"/>

              <button>Enviar</button>

            </form>
          </AccordionItemPanel>
        </AccordionItem>
          
      </Accordion>
    </motion.div>
    </>
  );
}

export default MapFilter;