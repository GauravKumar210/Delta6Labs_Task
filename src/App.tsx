
import './App.css';
import CoinCard from './components/CoinCard';
import CoinSelector from './components/CoinSelector';
import LanguageSelector from './components/LanguageSelector';

function App() {
  return (
    <>
    <LanguageSelector/>
    <CoinSelector/>
    <CoinCard/>
    </>
  );
}

export default App;
