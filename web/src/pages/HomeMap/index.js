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

import Menu from '../../components/Menu'
import MapPupup from '../../components/MapPopup'

import api from '../../services/api'

const HomeMap = () => {
  const [fields, setFields] = useState([])

  useEffect(() => {
    getFields();
  }, [])

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

  const getFields = async (parameters) => {
    const  { data } = await api.get('fields');
    const delimiterArea = data.map((field) => {
      delete field.gps.crs;
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
          onEachFeature={MapPupup}
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

      </MapContainer>
    </div>
  );
}

export default HomeMap;