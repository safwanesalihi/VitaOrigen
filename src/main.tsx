import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
