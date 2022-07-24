import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";


const BeerResponsiveBar = () => {
  const data = [
    { quarter: 1, earnings: 1000.5 },
    { quarter: 2, earnings: 1000.2 },
    { quarter: 3, earnings: 25000.5 },
    { quarter: 4, earnings: 1000.5 }
  ];
  const [beers, setBeers] = useState([{}])
  const [dateGroups, setDateGroups] = useState([{}])

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
            //setBeers(entries)
          }
          if (entriesResultObject.length === 0) {
            setBeers(entries)
          }
        })
        .catch(error => console.log('error', error));
    }
  }, [])

  useEffect(() => {
    const dataGroups = []
    for (let beer of beers) {
      let date = new Date()

      if (beer.first_brewed?.length === 4) {
        date = new Date(beer.first_brewed)
      }
      if (beer.first_brewed?.length === 7) {
        date = CreateDate(beer);
        console.log(date + "----" + beer.first_brewed)
      }
    }

    function CreateDate(beer) {
      let month = beer.first_brewed?.substr(0, 2) - 1
      let year = beer.first_brewed?.substr(3, 7)
      return  new Date(year, month)
    }
  }, [beers])

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
    <><div style={{ height: "400px" }}>
      <ResponsiveBar data={beers}
        keys={[""]}
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
          legendOffset: -40
        }}
      />
    </div>
      <div> {beers || null ? beers.map(beers => <div>{beers.first_brewed}</div>) : <div>NoCervecha</div>}</div>
    </>
  );

}
export default BeerResponsiveBar;