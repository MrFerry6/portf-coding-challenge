import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";





const BeerResponsiveBar = () => {
  
  const [beers, setBeers] = useState([{}])

  useEffect(() => {
    var entries = []
    getAllbeers(1);

    function getAllbeers(page) {
      var requestOptions = getRequestOptions()
      let url = "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=80"

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          const entriesResultObject = JSON.parse(result);
          if (entriesResultObject.length > 0) {
            for (let entrie of entriesResultObject) {
              entries.push(entrie)
            }
            getAllbeers(page + 1)

            console.log(entries)
          }
          if (entriesResultObject.length === 0) {
            setBeers(entries)
          }
        })
        .catch(error => console.log('error', error));
    }
  }, [])
  function getRequestOptions() {
    return {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      redirect: 'follow'
    };
  }

  return (
    <div>{beers || null ? beers.map(beers => <div>{beers.name}</div>) : <div>"No hay chervecha"</div>}</div>
  );

}
export default BeerResponsiveBar;