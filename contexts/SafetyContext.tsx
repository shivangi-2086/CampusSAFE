
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type SafetyStatus = 'Safe' | 'Monitoring' | 'Emergency';
export type UserRole = 'Student' | 'Staff' | 'Faculty' | 'Admin';
export type ReportType = 'Personal' | 'Social';

export interface Notification {
  id: string;
  senderName: string;
  message: string;
  time: string;
  severity: 'low' | 'high';
}

export interface IncidentReport {
  id: string;
  userId: string;
  userEmail: string;
  type: ReportType;
  category: string;
  location: string;
  description: string;
  status: 'Pending' | 'Verified' | 'False';
  timestamp: number;
}

interface SafetyContextType {
  status: SafetyStatus;
  setStatus: (status: SafetyStatus) => void;
  trustScore: number;
  updateTrustScore: (delta: number) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  notifications: Notification[];
  addNotification: (notif: Notification) => void;
  reports: IncidentReport[];
  submitReport: (report: Omit<IncidentReport, 'id' | 'status' | 'timestamp'>) => void;
  resolveReport: (reportId: string, isTrue: boolean) => void;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const SafetyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<SafetyStatus>('Safe');
  const [trustScore, setTrustScore] = useState<number>(() => {
    return Number(localStorage.getItem('trustScore')) || 100;
  });
  const [role, setRole] = useState<UserRole>('Student');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reports, setReports] = useState<IncidentReport[]>([]);

  useEffect(() => {
    localStorage.setItem('trustScore', trustScore.toString());
  }, [trustScore]);

  const updateTrustScore = (delta: number) => {
    setTrustScore(prev => Math.min(100, Math.max(0, prev + delta)));
  };

  const addNotification = (notif: Notification) => {
    setNotifications(prev => [notif, ...prev]);
  };

  const submitReport = (reportData: Omit<IncidentReport, 'id' | 'status' | 'timestamp'>) => {
    const newReport: IncidentReport = {
      ...reportData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      timestamp: Date.now()
    };
    setReports(prev => [newReport, ...prev]);
  };

  const resolveReport = (reportId: string, isTrue: boolean) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        // Find the user and update their score (simulation)
        // In a real app, this would be a server-side DB update
        if (isTrue) updateTrustScore(5);
        else updateTrustScore(-20);
        return { ...r, status: isTrue ? 'Verified' : 'False' };
      }
      return r;
    }));
  };

  return (
    <SafetyContext.Provider value={{ 
      status, setStatus, trustScore, updateTrustScore, 
      role, setRole, notifications, addNotification,
      reports, submitReport, resolveReport
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
