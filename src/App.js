import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProgressProvider } from './contexts/ProgressContext';
import ProtectedRoute from './components/ProtectedRoute';
import Section1 from './pages/Section1';
import Section2 from './pages/Section2';
import Section2Bonne from './pages/Section2Bonne';
import Section2Mauvaise from './pages/Section2Mauvaise';
import Section3 from './pages/Section3';
import Section3Enigmes from './pages/Section3Enigmes';
import Section4 from './pages/Section4';
import Section4Indice from './pages/Section4Indice';
import Section5 from './pages/Section5';
import Section5Indice from './pages/Section5Indice';
import Section6 from './pages/Section6';
import Section6Indice from './pages/Section6Indice';
import Proposition from './pages/Proposition';
import Bravo from './pages/Bravo';
import './App.css';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/section1" replace />} />
            <Route path="/section1" element={<Section1 />} />
            <Route 
              path="/section2" 
              element={
                <ProtectedRoute requiredSection="section2">
                  <Section2 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section2-bonne" 
              element={
                <ProtectedRoute requiredSection="section2-bonne">
                  <Section2Bonne />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section2-mauvaise" 
              element={
                <ProtectedRoute requiredSection="section2-mauvaise">
                  <Section2Mauvaise />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section3" 
              element={
                <ProtectedRoute requiredSection="section3">
                  <Section3 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section3-enigmes" 
              element={
                <ProtectedRoute requiredSection="section3-enigmes">
                  <Section3Enigmes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section4" 
              element={
                <ProtectedRoute requiredSection="section4">
                  <Section4 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section4-indice" 
              element={
                <ProtectedRoute requiredSection="section4-indice">
                  <Section4Indice />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section5" 
              element={
                <ProtectedRoute requiredSection="section5">
                  <Section5 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section5-indice" 
              element={
                <ProtectedRoute requiredSection="section5-indice">
                  <Section5Indice />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section6" 
              element={
                <ProtectedRoute requiredSection="section6">
                  <Section6 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/section6-indice" 
              element={
                <ProtectedRoute requiredSection="section6-indice">
                  <Section6Indice />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/proposition" 
              element={
                <ProtectedRoute requiredSection="proposition">
                  <Proposition />
                </ProtectedRoute>
              } 
            />
            <Route path="/bravo" element={<Bravo />} />
            <Route path="*" element={<Navigate to="/section1" replace />} />
          </Routes>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
