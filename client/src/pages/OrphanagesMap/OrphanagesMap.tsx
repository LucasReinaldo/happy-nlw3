import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { IoMdAdd, IoMdArrowForward } from 'react-icons/io';

import mapIcon from '../../utils/mapIcon';
import locationMarker from '../../assets/location-marker.svg';

import '../../styles/pages/OrphanagesMap.css';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const LAT = 53.3364736;
const LONG = -6.275072;

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/').then((response) => setOrphanages(response.data));
  }, []);

  return (
    <div id="page-map">
      <aside>
        <div className="header">
          <img src={locationMarker} alt="Logo" />
          <h2>Choose an Orphanage on the map</h2>
          <p>
            The kids are waiting for your visit
            <span role="img" aria-label="emoji">
              🙂
            </span>
          </p>
        </div>
        <div className="footer">
          <strong>Dublin</strong>
          <span>Ireland</span>
        </div>
      </aside>

      <Map
        center={[LAT, LONG]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TILE_LAYER_MAP}`}
        />

        {orphanages.map(({ latitude, longitude, id, name }) => (
          <Marker key={id} icon={mapIcon} position={[latitude, longitude]}>
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {name}
              <Link to={`/orphanages/${id}`}>
                <IoMdArrowForward size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="new-orphanage">
        <IoMdAdd size={36} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
