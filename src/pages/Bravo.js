import React from 'react';
import './Bravo.css';

const Bravo = () => {
  return (
    <div className="bravo-container">
      <div className="bravo-content">
        <div className="celebration-emoji">🎉</div>
        <h1 className="bravo-title">TABARNAK</h1>
        <h2 className="bravo-subtitle">Vous avez trouvé !</h2>

        <div className="bravo-message">
          <p>Les indices n'étaient pas faciles mais on avait 100% confiance en vous.</p>
          <p>C'est prévu pour Mars 2026 et ce sera un ou une Canadien(ne)</p>
        </div>
        <div className="celebration-hearts">
          <span>💕</span>
          <span>🤰</span>
          <span>💕</span>
        </div>
        <br />
        <p><i>🕵️ Ne cherchez pas plus concernant les VISA, c'était une fausse piste. Nous rentrerons à Noël 2025 si tout va bien et en mai 2027 définitivement</i></p>
      </div>
    </div>
  );
};

export default Bravo;