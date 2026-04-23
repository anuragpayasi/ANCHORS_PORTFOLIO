import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFF8F0',
            color: '#4B2E2B',
            border: '1px solid rgba(75,46,43,0.12)',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
