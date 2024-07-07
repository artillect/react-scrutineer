// src/tests/testUtils.js
import React from 'react';
import { render } from '@testing-library/react';
import { AppProvider } from '../contexts/AppContext';

console.log('AppProvider:', AppProvider); // Add this line

const AllTheProviders = ({ children }) => {
  if (!AppProvider) {
    console.error('AppProvider is undefined');
    return <>{children}</>;
  }
  return <AppProvider>{children}</AppProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };