import { dateFormat } from '../../utils/dateFormat'

import './styles.css';

const MapPopup = ({properties}, layer) => {
  const popupContent = `
    <Popup>
      <h2>Field (id: ${properties.id})</h2>
      <p><strong>Code:</strong> ${properties.farmCode}</p>

      <h2>Farm (id: ${properties.farm.id})</h2>
      <p><strong>Name:</strong> ${properties.farm.name}</p>
      <p><strong>Code:</strong> ${properties.farm.code}</p>

      <h2>Harvest (id: ${properties.farm.harvest.id})</h2>
      <p><strong>Code:</strong> ${properties.farm.harvest.code}</p>
      <p><strong>Start:</strong> ${dateFormat(properties.farm.harvest.start_date)}</p>
      <p><strong>End:</strong> ${dateFormat(properties.farm.harvest.end_date)}</p>

      <h2>Mill (id: ${properties.farm.harvest.mill.id})</h2>
      <p><strong>Name:</strong> ${properties.farm.harvest.mill.name}</p>
    </Popup>`
  layer.bindPopup(popupContent)
}

export default MapPopup;