import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactProfilerWrapper from './components/ReactProfilerWrapper';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactProfilerWrapper>
      <App />
    </ReactProfilerWrapper>
  </React.StrictMode>
);

reportWebVitals();