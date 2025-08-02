import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section2Mauvaise.css';

const Section2Mauvaise = () => {
  const navigate = useNavigate();
  const { unlockSection, getUserFirstChoice } = useProgress();

  const handleContinue = () => {
    const firstChoice = getUserFirstChoice();
    
    if (firstChoice === 'mauvaise') {
      // Si "Mauvaise nouvelle" était le premier choix, aller vers "Bonne nouvelle"
      unlockSection('section2-bonne');
      navigate('/section2-bonne');
    } else {
      // Si "Bonne nouvelle" était le premier choix, aller vers section3
      unlockSection('section3');
      navigate('/section3');
    }
  };

  return (
    <div className="section2-mauvaise-container">
      <div className="section2-mauvaise-content">
        <div className="bad-news-header">
          <div className="icon-container">
            <span className="warning-icon">⚠️</span>
          </div>
          <h1 className="bad-news-title">La tuile...</h1>
        </div>

        <div className="news-content">
          <div className="news-card">
            <p>
              Vous aurez peut être encore l'occasion (ou l'obligation) de venir nous voir au Canada !
            </p>
          </div>
        </div>

      <div className="action-section">
        <button className="continue-btn" onClick={handleContinue}>
          <span>Affronter la réalité</span>
          <span className="arrow">→</span>
        </button>
      </div>
    </div>
    </div >
  );
};

export default Section2Mauvaise;