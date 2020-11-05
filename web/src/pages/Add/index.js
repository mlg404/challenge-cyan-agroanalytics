import React, { useState, useEffect, useRef} from 'react';
import { FaMapMarkerAlt, FaCheck, FaTrashAlt } from 'react-icons/fa'
import Modal from 'react-modal'
import { useForm } from "react-hook-form";
import { useToasts } from 'react-toast-notifications'


import './styles.css'

import Menu from '../../components/Menu'

import api from '../../services/api'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '45vw',
    height                : '60vh'
  }
};


const Add = () => {
  const 
    [mills, setMills] = useState([]),
    [harvests, setHarvests] = useState([]),
    [farms, setFarms] = useState([]),
    [modalIsOpen,setIsOpen] = useState(false),
    [geopoints, setGeopoints] = useState([])
  const { register, handleSubmit } = useForm();
  const 
    formMillRef = useRef(null),
    formHarvestRef = useRef(null),
    formFarmRef = useRef(null),
    formFieldRef = useRef(null);

    const { addToast } = useToasts();

  function openModal() {
    setIsOpen(true);
  }
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

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


  const handleRegisterMill = ({addMillName}) => {
    const data = {
      name: addMillName
    }
    handleRegisterApi(data, 'mills')
  }

  const handleRegisterHarvest = ({
    addHarvestCode, 
    addHarvestStart, 
    addHarvestEnd, 
    addHarvestMill
  }) => {
    const data = {
      code: addHarvestCode,
      mill_id: addHarvestMill,
      start_date: addHarvestStart,
      end_date: addHarvestEnd
    }
    handleRegisterApi(data, 'harvests')
  }

  const handleRegisterFarm = ({addFarmCode, addFarmName, addFarmHarvest}) => {
    const data = {
      code: addFarmCode,
      name: addFarmName,
      harvest_id: addFarmHarvest
    }
    handleRegisterApi(data, 'farms')
  }

  const handleRegisterField = ({addFieldCode, addFieldFarm}) => {
    const coordsArray = [];
    geopoints.map(point => {
      coordsArray.push([point.lng, point.lat])
      return null
    })
    const data = {
      code: addFieldCode,
      farm_id: addFieldFarm,
      gps: {
        crs: {
            type: "name",
            properties: {
              name: "EPSG:4326"
            }
          },
          type: "Polygon",
          coordinates: [coordsArray]
        }

    }
    setGeopoints([])
    handleRegisterApi(data, 'fields')
  }

  const handleRegisterApi = async (data, type) => {
    try {
      const response = await api.post(type, data);
      console.log(response)
      addToast('The item was successfully added!', { appearance: 'success' })
      
    } catch (error) {
      console.log(error.response)
      addToast('Error to store item.', { appearance: 'error' })
    }
    formMillRef.current.reset();
    formHarvestRef.current.reset();
    formFarmRef.current.reset();
    formFieldRef.current.reset();
  }

  const addGeopoint = () => {
    setGeopoints([...geopoints, { lat: 0, lng: 0}])
  }
  const removeGeopoint = (index) => {
    const newGeopoints = [...geopoints];
    newGeopoints.splice(index, 1)
    setGeopoints(newGeopoints)
  }

  return (
    <div id="page-map" className="page-add-menu" >
      <Menu />
      <div id="page-container">
        <div id="add-box">
          <form ref={formMillRef} onSubmit={handleSubmit(handleRegisterMill)}>
            <h1>Mill</h1>
            <label>Name</label>
            <input name="addMillName" type="text" ref={register}/>
            <div className="card-buttons">
              <button className="success-button">
                <FaCheck size={12} color="#fff"/>
                <span>Save</span>
              </button>
            </div>
          </form>
          
        </div>
        <div id="add-box">
          <form ref={formHarvestRef} onSubmit={handleSubmit(handleRegisterHarvest)}>

            <h1>Harvest</h1>

            <label>Code</label>
            <input name="addHarvestCode" type="text" ref={register}/>

            <label>Start</label>
            <input name="addHarvestStart" type="date" ref={register}/>

            <label>End</label>
            <input name="addHarvestEnd" type="date" ref={register}/>

            <label>Associate to Mill</label>
            <input list="mills-list" name="addHarvestMill" type="text" ref={register}/>
            <datalist id="mills-list">
              {mills.map(mill => {
                return (
                  <option key={mill.id} value={mill.id} >{mill.name}</option>
                )
              })}
            </datalist>
            <div className="card-buttons">
              <button className="success-button">
                <FaCheck size={12} color="#fff"/>
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        <div id="add-box">
          <form ref={formFarmRef} onSubmit={handleSubmit(handleRegisterFarm)}>
            <h1>Farm</h1>

            <label>Code </label>
            <input name="addFarmCode" type="text" ref={register} />

            <label>Name </label>
            <input name="addFarmName" type="text" ref={register}/>

            <label>Associate to Harvest </label>
            <input list="harvests-list" name="addFarmHarvest" type="text" ref={register}/>
            <datalist id="harvests-list" >
              {harvests.map(harvest => {
                return (
                  <option key={harvest.id} value={harvest.id} >{harvest.code}</option>
                )
              })}
            </datalist>
            <div className="card-buttons">
              <button className="success-button">
                <FaCheck size={12} color="#fff"/>
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
        <div id="add-box">
          <form ref={formFieldRef} onSubmit={handleSubmit(handleRegisterField)}>
            <h1>Field</h1>

            <label>Code </label>
            <input name="addFieldCode" type="text" ref={register}/>

            <label>Associate to Farm </label>
            <input list="farms-list" name="addFieldFarm" type="text" ref={register}/>
            <datalist id="farms-list" >
              {farms.map(farm => {
                return (
                  <option key={farm.id} value={farm.id} >{farm.code} - {farm.name}</option>
                )
              })}
            </datalist>
            
            <div className="card-buttons">
              <button type="button" className="blue-button" onClick={openModal}>
                <FaMapMarkerAlt size={12} color="#fff"/>
                <span>Add geopoints</span>
              </button>

              <button className="success-button">
                <FaCheck size={12} color="#fff"/>
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div id="modal-content">
            <h1>Field geolocalization</h1>
            <small>Insert points to form a polygon 
              with the area of the Fields. To close the polygon your last point must be equalts to your first point</small>
              {geopoints.map((point, index) => (
                <div key={index} className="point-group">
                  <div>
                    <label>Latitude</label>
                    <input className="modal-input" onChange={(e) => geopoints[index].lat = e.target.value} type="text" />
                  </div>
                  <div>
                    <label>Longitude</label>
                    <input className="modal-input" onChange={(e) => geopoints[index].lng = e.target.value} type="text" />
                  </div>
                  <button onClick={() => removeGeopoint(index)} type="button" className="trash-button">
                    <FaTrashAlt size={16} color="#fff"/>
                  </button>
                </div>

              ))}
              <div className="modal-buttons-div">
                <button onClick={addGeopoint} type="button" className="blue-button button-modal">
                  <FaMapMarkerAlt size={12} color="#fff"/>
                  <span>Add point</span>
                </button>
                <br />
                <button onClick={closeModal} type="button" className="button-modal blue-button">
                  <FaCheck size={12} color="#fff"/>
                  <span>Save and close</span>
                </button>
              </div>
          </div>
        </Modal>
        
        
      </div>
      
    </div>
  );
}

export default Add;