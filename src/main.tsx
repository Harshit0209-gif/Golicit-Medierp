import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Global styles first, so component CSS Modules load after them and win ties.
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import App from './App';
import { dismissLoader } from './lib/loader';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Wait a frame so the hero <img> exists before checking whether it has loaded.
requestAnimationFrame(dismissLoader);
