import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section1.css';

const Section1 = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();

  const handleStartJourney = () => {
    unlockSection('section2');
    navigate('/section2');
  };

  return (
    <div className="section1-container">
      <div className="section1-content">
        <div className="section1-image-container">
          <div className="section1-placeholder-image">
            <span className="image-icon">🤯</span>
          </div>
        </div>
        
        <div className="section1-text-content">
          <h1 className="section1-title">
            On a quelque chose à vous dire...
          </h1>
          
          <p className="section1-subtitle">
            C'est un peu trop sensible pour vous l'annoncer comme ça. On doit s'assurer qu'on donne cette information aux bonnes personnes...
          </p>
          
          <button 
            className="section1-start-button"
            onClick={handleStartJourney}
          >
            OK c'est tout moi ça
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section1;