import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import YouTube from 'react-youtube';
import './Section2.css';

const Section2 = () => {
  const navigate = useNavigate();
  const { unlockSection, setUserFirstChoice } = useProgress();
  const [showChoices, setShowChoices] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const playerRef = useRef(null);

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setVideoReady(true);
    
    // Vérifier le temps de lecture toutes les 500ms
    const checkTime = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime >= 5 && !showChoices) {
          setShowChoices(true);
          clearInterval(checkTime);
        }
      }
    }, 500);

    // Nettoyer l'intervalle après 30 secondes pour éviter les fuites mémoire
    setTimeout(() => clearInterval(checkTime), 30000);
  };

  const onStateChange = (event) => {
    // Optionnel: gérer les changements d'état de la vidéo
  };

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

  // Extraire l'ID de la vidéo YouTube de l'URL
  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId('https://youtu.be/jxloWianaqc?list=TLGGcHkIRCdeMQoyNzA3MjAyNQ');

  return (
    <div className="section2-container">
      <div className="section2-content">
        <div className="video-section">
          <h2 className="section2-title">Regardez cette vidéo...</h2>
          
          <div className="video-container">
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
            />
          </div>

          {showChoices && (
            <div className="choices-overlay">
              <div className="choices-container">
                <h3 className="choices-title">Que voulez-vous entendre en premier ?</h3>
                
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
          )}
        </div>

        {!showChoices && videoReady && (
          <div className="waiting-message">
            <p>Regardez la vidéo... Les choix apparaîtront bientôt</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section2;