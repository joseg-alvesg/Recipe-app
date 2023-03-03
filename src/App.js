import React from 'react';
import Routes from './routes';
import SearchProvider from './contexts/SearchProvider';

export default function App() {
  return (
    <SearchProvider>
      <main>
        <Routes />
      </main>
    </SearchProvider>
  );
}
