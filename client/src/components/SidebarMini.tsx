import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { IoMdAdd, IoMdArrowBack } from 'react-icons/io';

import mapMarkerImg from '../assets/location-marker.svg';

import '../styles/components/SidebarMini.css';

const SidebarMini = () => {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      <div className="footer">
        <Link type="button" to="/orphanages/create">
          <IoMdAdd size={24} color="#FFF" />
        </Link>
        <button type="button" onClick={goBack}>
          <IoMdArrowBack size={24} color="#FFF" />
        </button>
      </div>
    </aside>
  );
};

export default SidebarMini;
