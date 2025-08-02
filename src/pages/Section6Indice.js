import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section6Indice.css';

const Section6Indice = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();
  const [showPassport, setShowPassport] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Afficher le passeport après 2 secondes
    const passportTimer = setTimeout(() => {
      setShowPassport(true);
    }, 2000);

    // Afficher le bouton 2 secondes après le passeport
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => {
      clearTimeout(passportTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handlePropositionClick = () => {
    unlockSection('proposition');
    navigate('/proposition');
  };

  return (
    <div className="section6-indice-container">
      <div className="section6-indice-content">
        <h1>Bravo !</h1>
        <p>Voici le dernier indice.</p>
        
        {showPassport && (
          <div className="passport-container">
            <img src="/passeport.png" alt="Passeport" className="passport-image" />
          </div>
        )}

        {showButton && (
          <button onClick={handlePropositionClick} className="proposition-btn">
            Continuer vers la proposition
          </button>
        )}
      </div>
    </div>
  );
};

export default Section6Indice;