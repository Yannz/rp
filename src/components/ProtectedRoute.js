import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

const ProtectedRoute = ({ children, requiredSection }) => {
  const { isUnlocked } = useProgress();

  if (!isUnlocked(requiredSection)) {
    return <Navigate to="/section1" replace />;
  }

  return children;
};

export default ProtectedRoute;