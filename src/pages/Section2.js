import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section2.css';

const Section2 = () => {
  const navigate = useNavigate();
  const { unlockSection, setUserFirstChoice } = useProgress();

  const handleBonneNouvelle = () => {
    setUserFirstChoice('bonne');
    unlockSection('section2-bonne');
    navigate('/section2-bonne');
  };

  const handleMauvaiseNouvelle = () => {
    setUserFirstChoice('mauvaise');
    unlockSection('section2-mauvaise');
    navigate('/section2-mauvaise');
  };

  return (
    <div className="section2-container">
      <div className="section2-content">
        <h1 className="section2-title">J'ai une bonne et une mauvaise nouvelle...</h1>
        <p className="section2-subtitle">Que voulez-vous entendre en premier ?</p>
        
        <div className="choice-buttons">
          <button 
            className="choice-btn good-news-btn"
            onClick={handleBonneNouvelle}
          >
            <span className="choice-icon">✅</span>
            <span className="choice-text">Bonne Nouvelle</span>
          </button>
          
          <button 
            className="choice-btn bad-news-btn"
            onClick={handleMauvaiseNouvelle}
          >
            <span className="choice-icon">❌</span>
            <span className="choice-text">Mauvaise Nouvelle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section2;