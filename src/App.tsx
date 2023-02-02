import { Alert, Header, NewsContainer, Pagination, Popup } from './components';
import './App.css';
import { useContext } from 'react';
import NewsContext from './context/NewsContext';

function App() {
  const { showErrorAlert } = useContext(NewsContext);

  return (
    <div className="App">
      {showErrorAlert && <Alert />}
      <Header />
      <NewsContainer />
      <Pagination />
      <Popup />
    </div>
  );
}

export default App;
