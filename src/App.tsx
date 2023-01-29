import { useState } from 'react';
import { Header, NewsContainer, Pagination } from './components';
import './App.css';
import { results } from './dummy';

function App() {
  const [count, setCount] = useState(0);
  console.log(results);

  return (
    <div className="App">
      <Header />
      <NewsContainer newsList={results.value} />
      <Pagination />
    </div>
  );
}

export default App;
