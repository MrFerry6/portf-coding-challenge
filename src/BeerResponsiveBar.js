import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";
import { useState } from "react";





const BeerResponsiveBar = () =>{

  const [beers, setBeers] = useState()
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

return (
  <div>{ beers || null ? beers.map(beers => <div>{beers.name}</div>) :  <div>"No hay chervecha"</div>  }</div>
);
export default  BeerResponsiveBar;