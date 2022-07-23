import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";





const BeerResponsiveBar = () => {

  const [beers, setBeers] = useState([{}])

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      redirect: 'follow'
    }

    fetch("https://api.punkapi.com/v2/beers", requestOptions)
      .then(response => response.text())
      .then(result => {
        const entriesResult = JSON.parse(result)
        let entries = [];
        for (let entrie of entriesResult){
          entries.push(entrie)
        }
        setBeers(entries)
      })
      .catch(error => console.log('error', error));
  }, [])



  return (
    <div>{beers || null ? beers.map(beers => <div>{beers.name}</div>) : <div>"No hay chervecha"</div>}</div>
  );
  /*var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.punkapi.com/v2/beers", requestOptions)
    .then(response => response.text())
    //.then(result => {console.log(result)})
    .catch(error => console.log('error', error));
   */
}
export default BeerResponsiveBar;