
import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import PatientDashboard from '@/components/PatientDashboard';
import CaretakerDashboard from '@/components/CaretakerDashboard';
import AuthForm from '@/components/AuthForm';

const Index = () => {
  const [currentView, setCurrentView] = useState('welcome'); // welcome, auth, patient, caretaker
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRoleSelection = (role) => {
    setUserRole(role);
    setCurrentView('auth');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView(userRole);
  };

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole);
    setCurrentView(newRole);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen onRoleSelect={handleRoleSelection} />;
      case 'auth':
        return <AuthForm role={userRole} onAuthSuccess={handleAuthSuccess} />;
      case 'patient':
        return <PatientDashboard onRoleSwitch={handleRoleSwitch} />;
      case 'caretaker':
        return <CaretakerDashboard onRoleSwitch={handleRoleSwitch} />;
      default:
        return <WelcomeScreen onRoleSelect={handleRoleSelection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
};

export default Index;
