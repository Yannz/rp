import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section4Indice.css';

const Section4Indice = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();
  const [showImages, setShowImages] = useState(false);

  const handleContinue = () => {
    unlockSection('section5');
    navigate('/section5');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="section4-indice-container">
      <div className="section4-indice-content">
        <h1>Bonne nouvelle</h1>
        <p>Vous semblez connaître Ali et Yann et vous avez plus de jugeote que je ne le croyais</p>

        {showImages && (
          <div className="mt-3">
            <p>
              Voici un premier indice, prenez-en bonne note
            </p>
            <div className="food-choices">
              <div className="food-item">
                <div className="image-container">
                  <img src={`${process.env.PUBLIC_URL}/poutine.jpg`} alt="Poutine" className="food-image" />
                  <div className="emoji-overlay check">✓</div>
                </div>
              </div>
              <div className="food-item">
                <div className="image-container">
                  <img src={`${process.env.PUBLIC_URL}/charcuterie.jpg`} alt="Charcuterie" className="food-image" />
                  <div className="emoji-overlay cross">✕</div>
                </div>
              </div>
            </div>
            <button onClick={handleContinue} className="continue-btn">
              Continuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section4Indice;