import { useState } from 'react';
import { Header, NewsContainer, Pagination, Popup } from './components';
import './App.css';
import { results } from './dummy';
import { PopupProvider } from './context';
import { NewsProvider } from './context';

function App() {
  console.log(results);

  return (
    <PopupProvider>
      <NewsProvider>
        <div className="App">
          <Header />
          <NewsContainer />
          <Pagination />
          <Popup />
        </div>
      </NewsProvider>
    </PopupProvider>
  );
}

export default App;
