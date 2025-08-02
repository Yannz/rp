import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section3.css';

const Section3 = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();

  const [visibleLines, setVisibleLines] = useState([true, false, false]);
  const [isHacked, setIsHacked] = useState(false);

  const lines = [
    "On vous avez dit qu'on ne voulait pas rester au Canada, pas au delà de notre visa actuel.",
    "Mais il faut savoir qu'en ce moment, des VISA valides en cours sont annulés par l'immigration.",
    "Au cas où, on a quand même lancé des démarches" 
  ];

  const showNextLine = (lineIndex) => {
    setVisibleLines(prev => {
      const newVisible = [...prev];
      newVisible[lineIndex] = true;
      return newVisible;
    });

    // Si c'est la 3ème ligne (index 2), lancer le timer pour le piratage
    if (lineIndex === 2) {
      setTimeout(() => {
        setIsHacked(true);
        setTimeout(() => {
          unlockSection('section3-enigmes');
          navigate('/section3-enigmes');
        }, 5000); // 3 secondes d'animation de piratage
      }, 3000); // 5 secondes après l'affichage
    }
  };

  return (
    <div className="section3-container">
      <div className="section3-content">
        <h1 className="section3-title">Et donc...</h1>
        <div className={`content-text ${isHacked ? 'hacked' : ''}`}>
          {lines.map((line, index) => (
            <div key={index} className="text-line">
              {visibleLines[index] && (
                <span className="line-text">{line}</span>
              )}
              {!visibleLines[index] && (index === 0 || visibleLines[index - 1]) && (
                <button 
                  className="expand-btn" 
                  onClick={() => showNextLine(index)}
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        {isHacked && (
          <div className="hack-overlay">
            <div className="hack-text">SYSTEM COMPROMISED...</div>
            <div className="hack-glitch">█████████████</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section3;