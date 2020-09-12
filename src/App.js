import React from 'react';
import './App.css';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/topBar/TopBar';
import { CurrentUserProvider } from './context/currentUser';
import CurrentUserChecker from './components/CurrentUserChecker';
function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
