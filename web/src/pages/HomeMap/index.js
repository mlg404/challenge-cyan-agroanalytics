import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet'

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

  const handleClick = () => {
    console.log(fields)
  }
  return (
    <div id="page-map" onClick={handleClick}>
      <Menu />

      <MapContainer
        center={[-21.751325,-41.3310294]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}
        maxZoom={17}
      >
        <ZoomControl position="topright"/>

        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"/>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <GeoJSON 
          key={fields}
          data={fields}
          onEachFeature={MapPupup}
        />
      </MapContainer>
    </div>
  );
}

export default HomeMap;