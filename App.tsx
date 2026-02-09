
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SafetyProvider } from './contexts/SafetyContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SOSScreen from './screens/SOSScreen';
import ReportScreen from './screens/ReportScreen';
import ContactsScreen from './screens/ContactsScreen';
import WalkScreen from './screens/WalkScreen';
import HistoryScreen from './screens/HistoryScreen';
import AdminDashboard from './screens/AdminDashboard';

const App: React.FC = () => {
  return (
    <div className="flex justify-center min-h-screen bg-[#f0f9ff] sm:bg-[#cbd5e1]">
      <div className="w-full max-w-[390px] min-h-screen app-bg shadow-2xl relative flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col relative z-10">
          <SafetyProvider>
            <HashRouter>
              <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/sos" element={<SOSScreen />} />
                <Route path="/report" element={<ReportScreen />} />
                <Route path="/contacts" element={<ContactsScreen />} />
                <Route path="/walk" element={<WalkScreen />} />
                <Route path="/history" element={<HistoryScreen />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </HashRouter>
          </SafetyProvider>
        </div>
      </div>
    </div>
  );
};

export default App;
