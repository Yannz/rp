import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section5Indice.css';

const Section5Indice = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();
  const [showPlane, setShowPlane] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleContinue = () => {
    unlockSection('section6');
    navigate('/section6');
  };

  useEffect(() => {
    const planeTimer = setTimeout(() => {
      setShowPlane(true);
    }, 2000);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 4000); // 2 secondes après l'avion

    return () => {
      clearTimeout(planeTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="section5-indice-container">
      <div className="section5-indice-content">
        <h1>Bravo !</h1>
        <p>Vous avez pensé à demander un VISA Talent international ?</p>
        <p>Voici l'indice suivant</p>
        {showPlane && (
          <div className="plane-container">
            <img src="/avion.png" alt="Avion Air France" className="plane-image" />
            <div className="red-cross">
              <div className="cross-line cross-line-1"></div>
              <div className="cross-line cross-line-2"></div>
            </div>
          </div>
        )}
        
        {showButton && (
          <button onClick={handleContinue} className="continue-btn">
            Continuer
          </button>
        )}
      </div>
    </div>
  );
};

export default Section5Indice;