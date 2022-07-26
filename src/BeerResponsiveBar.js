import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "./Events";
import Filter from "./Filters";

const BeerResponsiveBar = () => {
  const data = [
    { quarter: 1, earnings: 1000.5 },
    { quarter: 2, earnings: 1000.2 },
    { quarter: 3, earnings: 25000.5 },
    { quarter: 4, earnings: 1000.5 }
  ];
  const [beers, setBeers] = useState([{}])
  const [groupsByDate, setgroupsByDate] = useState([{}])
  const [endDateRange, setEndDateRange] = useState(new Date())
  const [startDateRange, setStartDateRange] = useState(new Date())

  useEffect(() => {
    subscribe("startDateChange", (detail) => setStartDateRange(new Date(detail.detail)))
    subscribe("endDateChange", (detail) => setEndDateRange(new Date(detail.detail)))
    
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
          }
          if (entriesResultObject.length === 0) {
            setBeers(entries)
          }
        })
        .catch(error => console.log('error', error))
      }
      return () => {
        unsubscribe("startDateChang");
        unsubscribe("endtDateChang");
      }
  }, [])

  useEffect(() =>{
    console.log("Effect tigered")
    
    console.log("End / " + endDateRange + "Start / " + startDateRange)

  }, [endDateRange, startDateRange])

  useEffect(() => {
    let dataGroups = []

    for (let beer of beers) {
      let date = new Date()

      date = ifYearFormat(beer, date)
      date = ifYearMonthFormat(beer, date)

      if (!isDateExist(dataGroups, date)) {
        dataGroups.push(newDataGroup(beer, date))
      }
      if (isDateExist(dataGroups, date)) {
        modifyDateGroup(dataGroups, date, beer)
      }
    }
    setgroupsByDate(dataGroups)

    sortDataGroups(dataGroups);
    console.log(dataGroups)

    setStartDateRange(dataGroups[0].date)
    setEndDateRange(dataGroups[dataGroups.length - 1].date)

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
      <Filter end={endDateRange} start={startDateRange} />
      <ResponsiveBar data={groupsByDate}
        keys={["totalBeers"]}
        indexBy="date"
        minValue={0}
        maxValue={50}
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
          legend: "One legend",
          legendPosition: "start",
          legendOffset: -40
        }}
      />
    </div>

    </>
  );

}
export default BeerResponsiveBar;

function sortDataGroups(dataGroups) {
  dataGroups.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
}

function newDataGroup(beer, date) {
  let newDataGroup = {
    beersIds: [],
    date: new Date(),
    totalBeers: 0,
    beersNames: []
  }
  newDataGroup.beersIds.push(beer.id)
  newDataGroup.date = date
  newDataGroup.totalBeers++
  newDataGroup.beersNames.push(beer.name)
  return newDataGroup
}

function isDateExist(dataGroups, date) {
  for (let group of dataGroups) {
    if (isSameDate(group, date)) {
      return true;
    }
  }
  return false;
}

function modifyDateGroup(dataGroups, date, beer) {
  for (let group of dataGroups) {
    if (isSameDate(group, date) && !group.beersIds.includes(beer.id)) {
      group.totalBeers++
      group.beersNames.push(beer.name)
      group.beersIds.push(beer.id)
    }
  }
}

function isSameDate(group, date) {
  return group.date.getMonth() === date.getMonth() &&
    group.date.getFullYear() === date.getFullYear();
}

function ifYearMonthFormat(beer, date) {
  if (beer.first_brewed?.length === 7) {
    date = CreateDate(beer)
    return date
  } else {
    return date;
  }
}

function ifYearFormat(beer, date) {
  if (beer.first_brewed?.length === 4) {
    date = new Date(beer.first_brewed);
    return date
  } else {
    return date;
  }
}

function CreateDate(beer) {
  let month = beer.first_brewed?.substr(0, 2) - 1
  let year = beer.first_brewed?.substr(3, 7)
  return new Date(year, month)
}