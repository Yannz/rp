import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import './Section5.css';

const Section5 = () => {
  const navigate = useNavigate();
  const { unlockSection } = useProgress();
  
  // Position initiale de l'échiquier selon l'image (a8-h8 = rangée 0, a1-h1 = rangée 7)
  const initialBoard = [
    ['', '', '', '', 'bR', '', '', ''], // 8ème rangée - Tour noire en e8
    ['bP', 'wQ', '', '', '', 'bP', 'bP', ''], // 7ème rangée - Pion noir a7, Dame blanche b7, Pions noirs f7, g7
    ['', '', '', '', '', '', '', 'bP'], // 6ème rangée - Pion noir h6
    ['', '', '', '', 'bQ', '', '', ''], // 5ème rangée - Dame noire en e5
    ['', '', '', '', 'bR', '', '', ''], // 4ème rangée - Tour noire en e4
    ['wP', '', '', '', '', '', '', ''], // 3ème rangée - Pion blanc a3
    ['', 'wP', '', '', 'bN', 'wP', 'wP', 'wP'], // 2ème rangée - Pions blancs b2, f2, g2, h2 + Cavalier noir e2
    ['', '', 'wB', 'wR', '', 'wR', '', 'wK']  // 1ère rangée - Fou blanc c1, Tours blanches d1, f1, Roi blanc h1
  ];

  const [board, setBoard] = useState(initialBoard);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'waiting', 'won', 'error'
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const pieceSymbols = {
    'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
    'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
  };

  const handleDragStart = (e, row, col) => {
    const piece = board[row][col];
    if (piece && piece.startsWith('b') && gameState === 'playing') {
      setDraggedPiece({ piece, fromRow: row, fromCol: col });
      e.dataTransfer.effectAllowed = 'move';
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toRow, toCol) => {
    e.preventDefault();
    if (!draggedPiece) return;

    const { piece, fromRow, fromCol } = draggedPiece;
    
    // Vérifier si c'est un coup valide selon la solution
    if (moveCount === 0) {
      // Premier coup: Dame noire e5 -> h2 (rangée 3, col 4 -> rangée 6, col 7)
      if (piece === 'bQ' && fromRow === 3 && fromCol === 4 && toRow === 6 && toCol === 7) {
        const newBoard = executeMove(fromRow, fromCol, toRow, toCol);
        setTimeout(() => {
          // Réponse automatique: Roi blanc h1 prend la Dame en h2
          executeWhiteMove(7, 7, 6, 7, newBoard); // Roi prend la Dame
          setMoveCount(1);
        }, 1000);
      } else {
        showError();
      }
    } else if (moveCount === 1) {
      // Deuxième coup: Tour noire e4 -> h4 (rangée 4, col 4 -> rangée 4, col 7)
      if (piece === 'bR' && fromRow === 4 && fromCol === 4 && toRow === 4 && toCol === 7) {
        executeMove(fromRow, fromCol, toRow, toCol);
        setGameState('won');
        // Redirection automatique après la victoire
        setTimeout(() => {
          handleBravo();
        }, 1500); // 2 secondes pour voir l'échec et mat
      } else {
        showError();
      }
    }

    setDraggedPiece(null);
  };

  const executeMove = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = board.map(row => [...row]);
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = '';
    setBoard(newBoard);
    return newBoard; // Retourner le nouveau plateau
  };

  const executeWhiteMove = (fromRow, fromCol, toRow, toCol, currentBoard = null) => {
    // Utiliser le plateau fourni ou l'état actuel
    const boardToUse = currentBoard || board;
    const newBoard = boardToUse.map(row => [...row]);
    newBoard[fromRow][fromCol] = ''; // Vide la case de départ
    newBoard[toRow][toCol] = 'wK'; // Roi blanc prend la position et capture la Dame noire (qui disparaît)
    setBoard(newBoard);
  };

  const showError = () => {
    setIsShaking(true);
    setTimeout(() => {
      setBoard(initialBoard);
      setMoveCount(0);
      setIsShaking(false);
    }, 600);
  };

  const handleBravo = () => {
    unlockSection('section5-indice');
    navigate('/section5-indice');
  };

  return (
    <div className="section5-container">
      <div className="section5-content">
        <h1 className="section5-title">Testons un peu plus votre logique</h1>
        <p>C'est une façon de m'assurer que vous êtes prêts pour la suite...</p>
        <p>Aux noirs de jouer</p>
        
        {gameState !== 'won' && (
          <div className={`chess-board ${isShaking ? 'shake' : ''}`}>
            {board.map((row, rowIndex) => 
              row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`chess-square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                >
                  {piece && (
                    <div
                      className={`chess-piece ${piece.startsWith('b') ? 'draggable' : ''}`}
                      draggable={piece.startsWith('b') && gameState === 'playing'}
                      onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                    >
                      {pieceSymbols[piece]}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
        
        {gameState === 'won' && (
          <div className="victory-section">
            <h2>Échec et mat !</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Section5;