import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Proposition.css';

const Proposition = () => {
  const [phrase, setPhrase] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phrase.trim()) {
      const normalizedPhrase = phrase.toLowerCase().trim();
      
      // Vérifier si la phrase contient "enceinte" ou "grossesse"
      if (normalizedPhrase.includes('enceinte') || normalizedPhrase.includes('grossesse')) {
        navigate('/bravo');
      } else {
        // Déclencher l'animation de secousse et vider le champ
        setIsShaking(true);
        setPhrase('');
        setTimeout(() => {
          setIsShaking(false);
        }, 600);
      }
    }
  };

  const handleInputChange = (e) => {
    setPhrase(e.target.value);
  };

  return (
    <div className="proposition-container">
      <div className="proposition-content">
        <h1>Alors ?</h1>

        <form onSubmit={handleSubmit} className={`input-section ${isShaking ? 'shake' : ''}`}>
          <label htmlFor="phrase-input">
            Maintenant que vous avez tous les indices, quelle est l'information du jour ?
          </label>
          <input
            id="phrase-input"
            type="text"
            value={phrase}
            onChange={handleInputChange}
            placeholder="Tapez votre réponse ici..."
            className="phrase-input"
          />
          <button
            type="submit"
            className="submit-btn"
            disabled={!phrase.trim()}
          >
            Valider ma proposition
          </button>
        </form>
      </div>
    </div>
  );
};

export default Proposition;