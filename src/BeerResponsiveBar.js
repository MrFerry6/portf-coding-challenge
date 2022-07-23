import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";


const BeerResponsiveBar = ({data}) =>{
  return (
    <div style={{ height: "250px" }}>
      <ResponsiveBar data={data} keys={["example"]} indexBy="value" />
    </div>
  );
}

export default  BeerResponsiveBar;