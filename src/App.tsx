
import './App.css';
import Banner from './components/Banner';
import CoinCard from './components/CoinCard';
import CoinList from './components/CoinList';
import CoinSelector from './components/CoinSelector';
import LanguageSelector from './components/LanguageSelector';
import Subscription from './components/Subscription';

function App() {
  return (
    <div className='parent-container'>
    {/* <LanguageSelector/> */}
    {/* <CoinSelector/> */}
    {/* <CoinCard/> */}
    {/* <Banner/> */}
    {/* <Subscription/> */}
    <CoinList/>
    </div>
  );
}

export default App;
