import React from 'react';
import ReactDOM from 'react-dom/client';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import './index.css';
import { NewsProvider, PopupProvider } from './context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PopupProvider>
      <NewsProvider>
        <App />
      </NewsProvider>
    </PopupProvider>
  </React.StrictMode>
);
