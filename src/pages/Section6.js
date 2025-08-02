import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section6.css';

const Section6 = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();
  
  const initialPhrases = [
    { id: 1, text: "1 - Ratenlissez !" },
    { id: 2, text: "2 - On dirait un bonnone" },
    { id: 3, text: "3 - Je me suis pirouetté" },
    { id: 4, text: "4 - Le nicérocéros" },
    { id: 5, text: "5 - Je transpu !" }
  ];

  const correctOrder = [3, 1, 5, 4, 2]; // De la plus récente à la plus ancienne
  
  const [availablePhrases, setAvailablePhrases] = useState(initialPhrases);
  const [sortedPhrases, setSortedPhrases] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleDragStart = (e, phrase) => {
    setDraggedItem(phrase);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnSorted = (e, targetIndex = null) => {
    e.preventDefault();
    if (draggedItem) {
      // Si l'item vient des phrases disponibles
      if (availablePhrases.find(p => p.id === draggedItem.id)) {
        // Ajouter à la pile triée à la position cible ou à la fin
        setSortedPhrases(prev => {
          const newArray = [...prev];
          const insertIndex = targetIndex !== null ? targetIndex : newArray.length;
          newArray.splice(insertIndex, 0, draggedItem);
          return newArray;
        });
        // Retirer de la liste disponible
        setAvailablePhrases(prev => prev.filter(p => p.id !== draggedItem.id));
      }
      // Si l'item vient de la pile triée (réorganisation)
      else if (sortedPhrases.find(p => p.id === draggedItem.id)) {
        setSortedPhrases(prev => {
          const currentIndex = prev.findIndex(p => p.id === draggedItem.id);
          const newArray = prev.filter(p => p.id !== draggedItem.id);
          const insertIndex = targetIndex !== null ? targetIndex : newArray.length;
          newArray.splice(insertIndex, 0, draggedItem);
          return newArray;
        });
      }
      setDraggedItem(null);
      setIsCorrect(null); // Reset validation
    }
  };

  const handleDropOnAvailable = (e) => {
    e.preventDefault();
    if (draggedItem) {
      // Vérifier si l'item vient de la pile triée
      if (sortedPhrases.find(p => p.id === draggedItem.id)) {
        // Remettre dans les phrases disponibles
        setAvailablePhrases(prev => [...prev, draggedItem].sort((a, b) => a.id - b.id));
        // Retirer de la pile triée
        setSortedPhrases(prev => prev.filter(p => p.id !== draggedItem.id));
      }
      setDraggedItem(null);
      setIsCorrect(null); // Reset validation
    }
  };

  const checkOrder = () => {
    if (sortedPhrases.length !== 5) {
      setCorrectCount(0);
      showError();
      return;
    }
    
    const currentOrder = sortedPhrases.map(p => p.id);
    
    // Compter les phrases bien placées
    let correct = 0;
    for (let i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i] === correctOrder[i]) {
        correct++;
      }
    }
    setCorrectCount(correct);
    
    const isOrderCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
    
    if (isOrderCorrect) {
      setIsCorrect(true);
      // Redirection automatique après 1.5 secondes
      setTimeout(() => {
        unlockSection('section6-indice');
        navigate('/section6-indice');
      }, 1000);
    } else {
      setIsCorrect(false);
      showError();
    }
  };

  const showError = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  const resetOrder = () => {
    setAvailablePhrases(initialPhrases);
    setSortedPhrases([]);
    setIsCorrect(null);
    setCorrectCount(0);
    setIsShaking(false);
  };

  return (
    <div className="section6-container">
      <div className="section6-content">
        <h1 className="section6-title">Votre mémoire maintenant</h1>
        <p>Romane peut dire quelques dingueries, a vous de glissez et déposez les phrases dans l'ordre chronologique (de la plus récente à la plus ancienne)</p>
        
        <div className="sorting-area">
          {/* Zone des phrases disponibles */}
          <div className="available-phrases">
            <h3>Phrases disponibles</h3>
            <div 
              className="phrases-container available-container"
              onDragOver={handleDragOver}
              onDrop={handleDropOnAvailable}
            >
              {availablePhrases.map(phrase => (
                <div
                  key={phrase.id}
                  className="phrase-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, phrase)}
                >
                  {phrase.text}
                </div>
              ))}
            </div>
          </div>

          {/* Zone de tri */}
          <div className="sorted-phrases">
            <h3>Ordre chronologique (plus récente en haut)</h3>
            <div 
              className={`phrases-container sorted-container ${isShaking ? 'shake' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDropOnSorted}
            >
              {sortedPhrases.length === 0 && (
                <div className="drop-zone-placeholder">
                  Déposez les phrases ici
                </div>
              )}
              {sortedPhrases.map((phrase, index) => (
                <div
                  key={phrase.id}
                  className="phrase-item sorted"
                  draggable
                  onDragStart={(e) => handleDragStart(e, phrase)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.stopPropagation();
                    handleDropOnSorted(e, index);
                  }}
                >
                  <span className="position-number">{index + 1}.</span>
                  {phrase.text}
                  <div className="drop-indicator-top" 
                       onDragOver={(e) => e.preventDefault()}
                       onDrop={(e) => {
                         e.stopPropagation();
                         handleDropOnSorted(e, index);
                       }}
                  ></div>
                  <div className="drop-indicator-bottom"
                       onDragOver={(e) => e.preventDefault()}
                       onDrop={(e) => {
                         e.stopPropagation();
                         handleDropOnSorted(e, index + 1);
                       }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="controls">
          <button onClick={checkOrder} className="check-btn">
            Vérifier l'ordre
          </button>
          <button onClick={resetOrder} className="reset-btn">
            Recommencer
          </button>
        </div>
        
        {isCorrect === false && (
          <div className="result error">
            {correctCount}/5 phrases bien placées. Continuez !
          </div>
        )}
      </div>
    </div>
  );
};

export default Section6;