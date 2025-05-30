import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import CalendarPage from "./components/CalendarPage";
import SchedulePage from "./components/SchedulePage";
import ClientsPage from "./components/ClientsPage";
import ManagerCalendarPage from "./components/CalendarManagerPage"; // Интерфейс начальника: календарь с клиентами
import ReportsPage from "./components/ReportsPage"; // Интерфейс начальника: отчёты по сотрудникам и клиентам
import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';
import "./App.css";
import UserInfo from './components/UserInfo';
import './components/SchedulePage.css';

// Инициализация Firebase
initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const tokenResult = await firebaseUser.getIdTokenResult();
        setUser(firebaseUser);
        setUserRole(tokenResult.claims.role || "employee");
      } else {
        setUser(null);
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <LoginPage />;
  }

  return (
    <Router>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '250px' }}>
          <Sidebar user={user} />
        </div>
        <div style={{ flex: 1 }}>
          <UserInfo />
          <Routes>
            <Route path="/" element={<Navigate to="/calendar" />} />
            <Route path="/calendar" element={<CalendarPage user={user} />} />
            <Route path="/schedule" element={<SchedulePage user={user} />} />
            <Route path="/clients" element={userRole === "manager" || userRole === "admin" ? <ClientsPage user={user} /> : <Navigate to="/calendar" />} />
            <Route path="/reports" element={userRole === "manager" || userRole === "admin" ? <ReportsPage user={user} /> : <Navigate to="/calendar" />} /> {/* Отчёты */}
            <Route path="/manager-calendar" element={<ManagerCalendarPage user={user} />} />  {/* Календарь начальника */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;