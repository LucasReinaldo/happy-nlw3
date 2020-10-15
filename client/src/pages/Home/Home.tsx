import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import '../../styles/pages/Home.css';

const Home: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Logo Happy" />

        <main>
          <h1>Bring happiness to the world</h1>
          <p>Visit orphanages and bring a smile to the children.</p>
        </main>

        <div className="location">
          <strong>Dublin</strong>
          <span>Ireland</span>
        </div>

        <Link to="/map" className="enter-app">
          <IoMdArrowForward size={28} color="rgba(0, 0, 0, 0.6" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
