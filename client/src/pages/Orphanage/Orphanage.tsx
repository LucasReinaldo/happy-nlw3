import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoMdClock, IoMdInformationCircle } from 'react-icons/io';
import { Map, Marker, TileLayer } from 'react-leaflet';

import SidebarMini from '../../components/SidebarMini';
import mapIcon from '../../utils/mapIcon';

import '../../styles/pages/Orphanage.css';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  open_on_weekends: string;
  opening_hours: boolean;
  images: {
    url: string;
    id: number;
  }[];
}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [orphanageImageIndex, setOrphanageImageIndex] = useState(0);

  const params = useParams<RouteParams>();

  useEffect(() => {
    api.get(`/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  console.log(orphanage);

  if (!orphanage) {
    return <p>Loading....</p>;
  }

  return (
    <div id="page-orphanage">
      <SidebarMini />
      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[orphanageImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                key={image.id}
                className={orphanageImageIndex === index ? 'active' : ''}
                type="button"
              >
                <img
                  src={image.url}
                  alt={orphanage.name}
                  onClick={() => setOrphanageImageIndex(index)}
                />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TILE_LAYER_MAP}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Directions (Google Maps)
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <IoMdClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <IoMdInformationCircle size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends closed">
                  <IoMdInformationCircle size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
