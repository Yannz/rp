import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section3Enigmes.css';

const Section3Enigmes = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();

  const handleContinue = () => {
    unlockSection('section4');
    navigate('/section4');
  };

  return (
    <div className="section3-enigmes-container">
      <div className="section3-enigmes-content">
        <h1 className="section3-enigmes-title">Oh non, ça bug...</h1>
        <p>
          On dirait que quelqu'un ou qu'une institution gouvernementale ne veut pas que ça se sache. <br />Mais on va pas se laisser intimider !<br />
          Avec un peu de concentration, on va trouver un moyen pour vous faire passer l'info.
        </p>
        <p>
          Si vous êtes prêts, on y va !
        </p>
        <button onClick={handleContinue} className="continue-btn">
          J'me tire une bûche et je suis prêt !
        </button>
      </div>
    </div>
  );
};

export default Section3Enigmes;