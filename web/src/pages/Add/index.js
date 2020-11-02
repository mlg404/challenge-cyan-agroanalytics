import React, { useState, useEffect } from 'react';

import './styles.css'

import Menu from '../../components/Menu'

import api from '../../services/api'

const Add = () => {
  const [mills, setMills] = useState([]);
  const [harvests, setHarvests] = useState([]);
  const [farms, setFarms] = useState([]);

  const getAll = async () => {
    const responseMills = await api.get('mills');
    const responseHarvests = await api.get('harvests');
    const responseFarms = await api.get('farms');
    setMills(responseMills.data);
    setHarvests(responseHarvests.data);
    setFarms(responseFarms.data);
  }

  useEffect(() => {
    getAll();
  }, [])
  

  return (
    <div id="page-map" className="page-add-menu">
      <Menu />
      <div id="page-container">
        <div id="add-box">
          <h1>Mill</h1>
          <label>Name</label>
          <input name="add-mill-name" type="text"/>
          
        </div>
        <div id="add-box">
          <h1>Harvest</h1>

          <label>Code</label>
          <input name="add-harvest-code" type="text"/>

          <label>Start</label>
          <input name="add-harvest-start" type="date"/>

          <label>End</label>
          <input name="add-harvest-end" type="date"/>

          <label>Associate to Mill</label>
          <input list="mills-list" name="add-harvest-mill" type="text"/>
          <datalist id="mills-list">
            {mills.map(mill => {
              return (
                <option key={mill.id} value={mill.id} >{mill.name}</option>
              )
            })}
          </datalist>
        </div>
        <div id="add-box">
          <h1>Farm</h1>

          <label>Code </label>
          <input name="add-farm-code" type="text"/>

          <label>Name </label>
          <input name="add-farm-name" type="text"/>

          <label>Associate to Harvest </label>
          <input list="harvests-list" name="add-farm-harvest" type="text"/>
          <datalist id="harvests-list" >
            {harvests.map(harvest => {
              return (
                <option key={harvest.id} value={harvest.id} >{harvest.code}</option>
              )
            })}
          </datalist>
        </div>

        <div id="add-box">
          <h1>Field</h1>

          <label>Code </label>
          <input name="add-field-code" type="text"/>

          <label>Associate to Farm </label>
          <input list="farms-list" name="add-field-farm" type="text"/>
          <datalist id="farms-list" >
            {farms.map(farm => {
              return (
                <option key={farm.id} value={farm.id} >{farm.code} - {farm.name}</option>
              )
            })}
          </datalist>
        </div>
        
        
      </div>
      
    </div>
  );
}

export default Add;