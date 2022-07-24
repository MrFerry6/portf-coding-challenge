import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";





const BeerResponsiveBar = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];
  const [beers, setBeers] = useState([{}])

  useEffect(() => {
    var entries = []
    getAllbeers(1);

    function getAllbeers(page) {
      var requestOptions = getRequestOptions()
      let url = "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=8"

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
          const entriesResultObject = JSON.parse(result);
          if (entriesResultObject.length > 0) {
            for (let entrie of entriesResultObject) {
              entries.push(entrie)
            }
            //getAllbeers(page + 1)
            setBeers(entries)
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
  console.log("BEERS="+ JSON.stringify( beers))
  return (
    <div style={{ height: "400px" }}>
    <ResponsiveBar data={beers} keys={["abv"]} indexBy="id" />
  </div>
  );

}
export default BeerResponsiveBar;