import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";





const BeerResponsiveBar = () => {
  const data = [
    { quarter: 1, earnings: 1000.5 },
    { quarter: 2, earnings: 1000.2 },
    { quarter: 3, earnings: 25000.5},
    { quarter: 4, earnings: 1000.5 }
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
    <ResponsiveBar data={beers} 
    keys={["abv"]} 
    indexBy="id"
     minValue="0" 
     maxValue="20"
     margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
     padding={0.4}
     valueScale={{ type: "linear" }}
     colors="#3182CE"
     animate={true}
     enableLabel={true}
     axisLeft={{
       tickSize: 5,
       tickPadding: 5,
       tickRotation: 0,
       legend: "degrees",
       legendPosition: "middle",
       legendOffset: -40}}
    />
  </div>
  );

}
export default BeerResponsiveBar;