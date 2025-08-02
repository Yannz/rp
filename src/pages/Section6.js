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
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState(null);

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
    setSelectedPhrase(null);
  };

  // Détecter si on est sur mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gestion des clics pour mobile
  const handlePhraseClick = (phrase) => {
    if (!isMobile) return;
    
    // Si c'est une phrase disponible, l'ajouter directement à la pile
    if (availablePhrases.find(p => p.id === phrase.id)) {
      setSortedPhrases(prev => [...prev, phrase]);
      setAvailablePhrases(prev => prev.filter(p => p.id !== phrase.id));
      setIsCorrect(null);
      return;
    }
    
    // Si c'est une phrase dans la pile, la sélectionner pour réorganisation
    if (selectedPhrase && selectedPhrase.id === phrase.id) {
      // Désélectionner si on clique sur la même phrase
      setSelectedPhrase(null);
    } else {
      setSelectedPhrase(phrase);
    }
  };

  const handleContainerClick = (targetContainer, targetIndex = null) => {
    if (!isMobile || !selectedPhrase) return;
    
    if (targetContainer === 'sorted') {
      // Déplacer vers la pile triée
      if (availablePhrases.find(p => p.id === selectedPhrase.id)) {
        // Depuis phrases disponibles vers pile triée
        setSortedPhrases(prev => {
          const newArray = [...prev];
          const insertIndex = targetIndex !== null ? targetIndex : newArray.length;
          newArray.splice(insertIndex, 0, selectedPhrase);
          return newArray;
        });
        setAvailablePhrases(prev => prev.filter(p => p.id !== selectedPhrase.id));
      } else if (sortedPhrases.find(p => p.id === selectedPhrase.id)) {
        // Réorganiser dans la pile triée
        setSortedPhrases(prev => {
          const currentIndex = prev.findIndex(p => p.id === selectedPhrase.id);
          const newArray = prev.filter(p => p.id !== selectedPhrase.id);
          const insertIndex = targetIndex !== null ? targetIndex : newArray.length;
          newArray.splice(insertIndex, 0, selectedPhrase);
          return newArray;
        });
      }
    } else if (targetContainer === 'available') {
      // Remettre dans les phrases disponibles
      if (sortedPhrases.find(p => p.id === selectedPhrase.id)) {
        setAvailablePhrases(prev => [...prev, selectedPhrase].sort((a, b) => a.id - b.id));
        setSortedPhrases(prev => prev.filter(p => p.id !== selectedPhrase.id));
      }
    }
    
    setSelectedPhrase(null);
    setIsCorrect(null);
  };

  // Gestion du clic sur une position spécifique dans la pile
  const handleSortedPositionClick = (e, targetIndex) => {
    if (!isMobile || !selectedPhrase) return;
    e.stopPropagation();
    
    if (sortedPhrases.find(p => p.id === selectedPhrase.id)) {
      // Réorganiser dans la pile triée
      setSortedPhrases(prev => {
        const currentIndex = prev.findIndex(p => p.id === selectedPhrase.id);
        if (currentIndex === targetIndex) return prev; // Même position
        
        const newArray = prev.filter(p => p.id !== selectedPhrase.id);
        newArray.splice(targetIndex, 0, selectedPhrase);
        return newArray;
      });
      setSelectedPhrase(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className="section6-container">
      <div className="section6-content">
        <h1 className="section6-title">Votre mémoire maintenant</h1>
        <p>Romane peut dire quelques dingueries, à vous de glissez et déposez les phrases dans l'ordre chronologique (de la plus récente à la plus ancienne)</p>
        {isMobile && (
          <div className="mobile-instructions">
            <p><strong>📱 Instructions mobile :</strong></p>
            <p>• Tapez sur une phrase disponible → ajoutée automatiquement à la pile</p>
            <p>• Tapez sur une phrase de la pile → sélection pour repositionnement</p>
            <p>• Tapez sur "Placer en position X" pour repositionner</p>
          </div>
        )}
        
        <div className="sorting-area">
          {/* Zone des phrases disponibles */}
          <div className="available-phrases">
            <h3>Phrases disponibles</h3>
            <div 
              className={`phrases-container available-container ${
                isMobile ? 'mobile-container' : ''
              }`}
              onDragOver={!isMobile ? handleDragOver : undefined}
              onDrop={!isMobile ? handleDropOnAvailable : undefined}
              onClick={isMobile ? () => handleContainerClick('available') : undefined}
            >
              {availablePhrases.map(phrase => (
                <div
                  key={phrase.id}
                  className={`phrase-item ${
                    selectedPhrase && selectedPhrase.id === phrase.id ? 'selected' : ''
                  } ${isMobile ? 'mobile-phrase' : ''}`}
                  draggable={!isMobile}
                  onDragStart={!isMobile ? (e) => handleDragStart(e, phrase) : undefined}
                  onClick={() => handlePhraseClick(phrase)}
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
              className={`phrases-container sorted-container ${isShaking ? 'shake' : ''} ${
                isMobile ? 'mobile-container' : ''
              }`}
              onDragOver={!isMobile ? handleDragOver : undefined}
              onDrop={!isMobile ? handleDropOnSorted : undefined}
              onClick={isMobile ? () => handleContainerClick('sorted') : undefined}
            >
              {sortedPhrases.length === 0 && (
                <div className="drop-zone-placeholder">
                  Déposez les phrases ici
                </div>
              )}
              {sortedPhrases.map((phrase, index) => (
                <React.Fragment key={phrase.id}>
                  {/* Zone de drop au-dessus (mobile) */}
                  {isMobile && index === 0 && (
                    <div 
                      className="mobile-drop-zone top"
                      onClick={(e) => handleSortedPositionClick(e, 0)}
                    >
                      Placer en position 1
                    </div>
                  )}
                  
                  <div
                    className={`phrase-item sorted ${
                      selectedPhrase && selectedPhrase.id === phrase.id ? 'selected' : ''
                    } ${isMobile ? 'mobile-phrase' : ''}`}
                    draggable={!isMobile}
                    onDragStart={!isMobile ? (e) => handleDragStart(e, phrase) : undefined}
                    onDragOver={!isMobile ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    } : undefined}
                    onDrop={!isMobile ? (e) => {
                      e.stopPropagation();
                      handleDropOnSorted(e, index);
                    } : undefined}
                    onClick={() => handlePhraseClick(phrase)}
                  >
                    <span className="position-number">{index + 1}.</span>
                    <span className="phrase-text">{phrase.text}</span>
                    {isMobile && (
                      <button 
                        className="mobile-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAvailablePhrases(prev => [...prev, phrase].sort((a, b) => a.id - b.id));
                          setSortedPhrases(prev => prev.filter(p => p.id !== phrase.id));
                          setSelectedPhrase(null);
                          setIsCorrect(null);
                        }}
                      >
                        ↩️
                      </button>
                    )}
                    {!isMobile && (
                      <>
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
                      </>
                    )}
                  </div>
                  
                  {/* Zone de drop en-dessous (mobile) */}
                  {isMobile && (
                    <div 
                      className="mobile-drop-zone bottom"
                      onClick={(e) => handleSortedPositionClick(e, index + 1)}
                    >
                      Placer en position {index + 2}
                    </div>
                  )}
                </React.Fragment>
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