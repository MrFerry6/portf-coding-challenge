import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "./Events";
import Filter from "./Filters";


const BeerResponsiveBar = () => {

  const [beers, setBeers] = useState([{}])
  const [groupsByDate, setGroupsByDate] = useState([{}])
  const [groupsByFilterDate, setGroupsByFilterDate] = useState([{}])
  const [endDateRange, setEndDateRange] = useState(new Date())
  const [startDateRange, setStartDateRange] = useState(new Date())
  const [startMinDate, setStartMinDate] = useState(new Date())
  const [endMaxDate, setEndMaxDate] = useState(new Date())
  const [isFromPiked, setIsFromPiked] = useState(false)
  const [valuesABVList, setValuesAVList] = useState([])
  const [abvValue, setAbvValue] = useState(0)
  useEffect(() => {

    subscribe("startDateChange", (detail) => setStartDateRange(new Date(detail.detail)))
    subscribe("endDateChange", (detail) => setEndDateRange(new Date(detail.detail)))
    subscribe("abvValueChange", (detail) => setAbvValue(detail.detail))

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
      unsubscribe("startDateChange")
      unsubscribe("endDateChange")
      unsubscribe("abvValueChange")
    }
  }, [])

  useEffect(() => {
    let dataGroups = []

    for (let beer of beers) {
      let date = new Date()

      date = ifYearFormat(beer, date)
      date = ifYearMonthFormat(beer, date)

      createIfNoExist(dataGroups, date, beer);
      modifyIfExist(dataGroups, date, beer);
    }
    setGroupsByDate(dataGroups)
    setIsFromPiked(false)

    sortDataGroups(dataGroups);

    setStartDateRange(dataGroups[0].date)
    setEndDateRange(dataGroups[dataGroups.length - 1].date)
    setStartMinDate(dataGroups[0].date)
    setEndMaxDate(dataGroups[dataGroups.length - 1].date)
  }, [beers])

  useEffect(() => {
    setGroupsByFilterDate(getByDateRange(startDateRange, endDateRange, groupsByDate))
    setIsFromPiked(true)
    if (abvValue) {
      setGroupsByFilterDate(filterByAbv(startDateRange, endDateRange, groupsByDate, abvValue))
    }
  }, [endDateRange, startDateRange])
  useEffect(() => {

    setGroupsByFilterDate(filterByAbv(startDateRange, endDateRange, groupsByDate, abvValue))

  }, [abvValue])

  useEffect(() => {
    setValuesAVList(getAbvValues(startDateRange, endDateRange, groupsByDate));
  }, [groupsByFilterDate])

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
    <><div className="beer-responsive-bar">
      <Filter
        end={endDateRange}
        start={startDateRange}
        startMin={startMinDate}
        endMax={endMaxDate}
        AbvList={valuesABVList} />

      <ResponsiveBar
        data={isFromPiked ? groupsByFilterDate : groupsByDate}
        keys={["totalBeers"]}
        indexBy="shortDate"
        margin={{ top: 20, right: 10, bottom: 50, left: 50}}
        padding={0.1}
        enableLabel={true}
        theme={{
          tooltip: {
            container: {
              background: "black",
              color: "white",
              fontSize: "inherit",
              borderRadius: "2px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
              padding: "5px 9px"
            }          
          }
          
        }}
        axisBottom={{
          tickRotation: 90,
          legendOffset: -80,
          legendPosition: 'start',
       }}
      />
    </div>

    </>
  );

}
export default BeerResponsiveBar;

function filterByAbv(start, end, groupsByDate, abvValue) {
  let groupsByAbv = []
  const groups = getByDateRange(start, end, groupsByDate)

  for (let group of groups) {
    if (group.abv === abvValue) {
      groupsByAbv.push(group);
    }
  }

  return groupsByAbv
}

function getAbvValues(start, end, groupsByDate) {
  let abvList = [];
  const groups = getByDateRange(start, end, groupsByDate)

  for (let group of groups) {
    if (!abvList.includes(group.abv)) {
      abvList.push(group.abv)
    }
  }
  return abvList;
}

function modifyIfExist(dataGroups, date, beer) {
  if (isDateExist(dataGroups, date)) {
    modifyDateGroup(dataGroups, date, beer);
  }
}

function createIfNoExist(dataGroups, date, beer) {
  if (!isDateExist(dataGroups, date)) {
    dataGroups.push(newDataGroup(beer, date));
  }
}

function sortDataGroups(dataGroups) {
  dataGroups.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
}
function getByDateRange(start, end, groups) {
  let filterGroups = []

  for (let group of groups) {
    if (group.date <= end && group.date >= start) {
      filterGroups.push(group)
    }
  }
  return filterGroups
}
function newDataGroup(beer, date) {
  let newDataGroup = {
    beersIds: [],
    date: new Date(),
    shortDate: "",
    totalBeers: 0,
    beersNames: [],
    abv: 0
  }

  newDataGroup.beersIds.push(beer.id)
  newDataGroup.date = date
  newDataGroup.shortDate = JSON.stringify(date.getMonth() + 1) +
    "/" + JSON.stringify(date.getFullYear())
  newDataGroup.totalBeers++
  newDataGroup.beersNames.push(beer.name)
  newDataGroup.abv = beer.abv
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