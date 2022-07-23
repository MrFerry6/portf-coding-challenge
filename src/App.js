import BeerResponsiveBar from './BeerResponsiveBar';
import './App.css';
import beers from './Beers';

function App() {
  return (
    <div className="App">
    <BeerResponsiveBar data={beers}/>
    </div>
  );
}

export default App;
