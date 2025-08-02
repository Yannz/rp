import React, { useState } from 'react';
import './Proposition.css';

const Proposition = () => {
  const [phrase, setPhrase] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phrase.trim()) {
      console.log('Phrase soumise:', phrase);
      // TODO: Traitement de la phrase
    }
  };

  const handleInputChange = (e) => {
    setPhrase(e.target.value);
  };

  return (
    <div className="proposition-container">
      <div className="proposition-content">
        <h1>Alors ?</h1>

        <form onSubmit={handleSubmit} className="input-section">
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