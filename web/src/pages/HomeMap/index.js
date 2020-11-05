import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON, 
  ZoomControl, 
  useMap, 
  MapConsumer 
} from 'react-leaflet'
import { FaMapMarkerAlt } from 'react-icons/fa'

import './styles.css'
import 'leaflet/dist/leaflet.css'
import 'react-accessible-accordion/dist/fancy-example.css';

import Menu from '../../components/Menu'
import MapPopup from '../../components/MapPopup'
import MapFilter from '../../components/MapFilter'

import api from '../../services/api'

const HomeMap = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    getFields();
  }, [])

  const getFields = async (parameters) => {

    let  { data } = await api.get('fields', { params: parameters});
    console.log(data)

    const delimiterArea = data.map((field) => {
      return {
        type: "Feature",
        geometry: field.gps,
        properties:{
          id: field.id,
          farmCode:field.code,
          farm: field.farm,
        }
      }
    })
    setFields(delimiterArea);
  }


  const SetInitialLocation = () => {
    const map = useMap();
    const isUserLocationAlredyDeclared = localStorage.getItem('userLocation');

    if(!isUserLocationAlredyDeclared){
      navigator.geolocation.getCurrentPosition(({coords}) =>{
        localStorage.setItem(
          'userLocation', 
          JSON.stringify([coords.latitude, coords.longitude])
        )
        map.flyTo([coords.latitude, coords.longitude])
      })
    } else {
      map.flyTo(JSON.parse(isUserLocationAlredyDeclared))
    }

    return null;
  }

  const setMyDefaultMapCenter = ({lat, lng}) => {
    localStorage.setItem('userLocation', JSON.stringify([lat,lng]))
  }

  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    event.preventDefault();
    console.log([...formData])
    const removeEmpty = [...formData].filter(fdata => {
      if (fdata[1] !== "") return fdata

      return null
    })
    const data = {}
    removeEmpty.map(item => {
      data[item[0]] = item[1]
      return null
    });
    getFields(data);
}

  return (
    <div id="page-map">
      <Menu />

      <MapContainer
        center={[0,0]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}
        maxZoom={17}
        
      >
        <SetInitialLocation />
        <ZoomControl position="topright"/>

        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"/>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <GeoJSON 
          key={fields}
          data={fields}
          onEachFeature={MapPopup}
        />

        <MapConsumer>
        {(map) => {
          return (
            <button className="blue-map-button" onClick={() => setMyDefaultMapCenter(map.getCenter())}>
              <FaMapMarkerAlt size={12} color="#fff"/>
              <span>Set map center as my default location</span>
            </button>
          )
        }}
        </MapConsumer>

        <MapFilter submitFc={handleSubmit}/>
        

      </MapContainer>
    </div>
  );
}

export default HomeMap;