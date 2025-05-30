import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-calendar/dist/Calendar.css';
import './index.css'; // тут у тебя стили holiday и weekend

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
