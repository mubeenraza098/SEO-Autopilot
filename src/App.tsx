import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SetupWizard from './pages/SetupWizard';
import Dashboard from './pages/Dashboard';
import AuditsPage from './pages/AuditsPage';
import ContentPage from './pages/ContentPage';
import BacklinksPage from './pages/BacklinksPage';
import LocalSEOPage from './pages/LocalSEOPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import LoadingSpinner from './components/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } />
            <Route path="/setup" element={
              <ProtectedRoute>
                <SetupWizard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <Dashboard />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/audits" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <AuditsPage />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/content" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <ContentPage />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/backlinks" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <BacklinksPage />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/local-seo" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <LocalSEOPage />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <ReportsPage />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <ProjectProvider>
                  <SettingsPage />
                </ProjectProvider>
              </ProtectedRoute>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;