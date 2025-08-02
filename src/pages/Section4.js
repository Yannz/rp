import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section4.css';

const Section4 = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const correctAnswer = ['montréal', 'Montréal', 'montreal', 'Montreal'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userAnswer = answer.toLowerCase().trim();
    
    if (correctAnswer.includes(userAnswer)) {
      // Bonne réponse
      unlockSection('section4-indice');
      navigate('/section4-indice');
    } else {
      // Mauvaise réponse - secouer et vider le champ
      setIsShaking(true);
      setAnswer('');
      
      // Arrêter l'animation après 600ms
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="section4-container">
      <div className="section4-content">
        <div className="enigma-header">
          <h1 className="section4-title">Soyez discrets...</h1>
          <div className="mystery-icon">🔐</div>
        </div>

        <div className="cryptic-message">
          <p className="cryptic-text">
          Pi wmkrep iwx gsyté, tpyw hi rsyzippi hy Gerehe. N’em fiwsmr hi zsyw ézepyiv : herw uyippi zmppi wsrx Epm ix Cerr egxyippiqirx ?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <div className="form-group">
            <label htmlFor="answer" className="answer-label">
              Réponse ?
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`answer-input ${isShaking ? 'shake' : ''}`}
              placeholder="Entrez votre réponse..."
              autoComplete="off"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            OK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Section4;