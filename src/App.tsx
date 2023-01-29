import { useState } from 'react';
import { Header, NewsContainer, Pagination, Popup } from './components';
import './App.css';
import { results } from './dummy';

function App() {
  const [showPopup, setShowPopUp] = useState(true);
  console.log(results);

  const handleShowPopup = () => setShowPopUp(true);

  const handleClosePopup = () => setShowPopUp(false);

  return (
    <div className="App">
      <Header />
      <NewsContainer newsList={results.value} />
      <Pagination />
      <Popup showPopup={showPopup} hidePopup={handleClosePopup} />
    </div>
  );
}

export default App;
