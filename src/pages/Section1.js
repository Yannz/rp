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
            <span className="image-icon">🎭</span>
          </div>
        </div>
        
        <div className="section1-text-content">
          <h1 className="section1-title">
            Bienvenue dans cette Aventure
          </h1>
          
          <p className="section1-subtitle">
            Une expérience interactive vous attend. Suivez les indices, 
            résolvez les énigmes et découvrez ce qui vous attend...
          </p>
          
          <button 
            className="section1-start-button"
            onClick={handleStartJourney}
          >
            Commencer l'Aventure
          </button>
        </div>
      </div>
      
      <div className="section1-footer">
        <p className="section1-hint">
          💡 Astuce : Chaque action que vous effectuez débloque la suite de l'histoire
        </p>
      </div>
    </div>
  );
};

export default Section1;