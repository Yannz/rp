import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [unlockedSections, setUnlockedSections] = useState(['section1']);
  const [currentSection, setCurrentSection] = useState('section1');
  const [sectionData, setSectionData] = useState({});
  const [firstChoice, setFirstChoice] = useState(null); // 'bonne' ou 'mauvaise'

  const unlockSection = (sectionId) => {
    setUnlockedSections(prev => {
      if (!prev.includes(sectionId)) {
        return [...prev, sectionId];
      }
      return prev;
    });
  };

  const isUnlocked = (sectionId) => {
    return unlockedSections.includes(sectionId);
  };

  const navigateToSection = (sectionId) => {
    if (isUnlocked(sectionId)) {
      setCurrentSection(sectionId);
      return true;
    }
    return false;
  };

  const storeSectionData = (sectionId, data) => {
    setSectionData(prev => ({
      ...prev,
      [sectionId]: data
    }));
  };

  const getSectionData = (sectionId) => {
    return sectionData[sectionId] || {};
  };

  const setUserFirstChoice = (choice) => {
    setFirstChoice(choice);
  };

  const getUserFirstChoice = () => {
    return firstChoice;
  };

  const value = {
    unlockedSections,
    currentSection,
    unlockSection,
    isUnlocked,
    navigateToSection,
    storeSectionData,
    getSectionData,
    setUserFirstChoice,
    getUserFirstChoice
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};