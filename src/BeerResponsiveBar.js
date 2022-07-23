import ResponsiveBar from "nivo/lib/components/charts/bar/ResponsiveBar";

const data = [
  { example: 1, value: 250 },
  { example: 2, value: 25 },
  { example: 3, value: 3500 }
];


function BeerResponsiveBar() {
  return (
    <div style={{ height: "250px" }}>
      <ResponsiveBar data={data} keys={["example"]} indexBy="value" />
    </div>
  );
}

export default  BeerResponsiveBar;