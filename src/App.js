import React from 'react';
import Routes from './routes';
import SearchProvider from './contexts/SearchProvider';
import './App.css';

export default function App() {
  return (
    <SearchProvider>
      <main>
        <Routes />
      </main>
    </SearchProvider>
  );
}
