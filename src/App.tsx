import { useState } from 'react';
import { Header, NewsContainer, Pagination, Popup } from './components';
import './App.css';
import { results } from './dummy';
import { PopupProvider } from './context';

function App() {
  console.log(results);

  return (
    <PopupProvider>
      <div className="App">
        <Header />
        <NewsContainer newsList={results.value} />
        <Pagination />
        <Popup />
      </div>
    </PopupProvider>
  );
}

export default App;
