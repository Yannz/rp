import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section2Bonne.css';

const Section2Bonne = () => {
  const navigate = useNavigate();
  const { unlockSection, getUserFirstChoice } = useProgress();

  const handleContinue = () => {
    const firstChoice = getUserFirstChoice();
    
    if (firstChoice === 'bonne') {
      // Si "Bonne nouvelle" était le premier choix, aller vers "Mauvaise nouvelle"
      unlockSection('section2-mauvaise');
      navigate('/section2-mauvaise');
    } else {
      // Si "Mauvaise nouvelle" était le premier choix, aller vers section3
      unlockSection('section3');
      navigate('/section3');
    }
  };

  return (
    <div className="section2-bonne-container">
      <div className="section2-bonne-content">
        <div className="good-news-header">
          <div className="icon-container">
            <span className="celebration-icon">🎉</span>
          </div>
          <h1 className="good-news-title">Le bon côté</h1>
        </div>

        <div className="news-content">
          <div className="news-card">
            <p>
              Comme ça on sera tranquille.
            </p>
          </div>

          <div className="action-section">
            <button className="continue-btn" onClick={handleContinue}>
              <span>Ok et après ?</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2Bonne;