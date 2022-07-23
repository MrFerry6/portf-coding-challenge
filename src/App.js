import BeerResponsiveBar from './BeerResponsiveBar';
import './App.css';

const data = [
  { example: 1, value: 250 },
  { example: 2, value: 25 },
  { example: 3, value: 3500 }
];


function App() {
  return (
    <div className="App">
    <BeerResponsiveBar data={data}/>
    </div>
  );
}

export default App;
