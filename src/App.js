import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DataTable from "./DataTable";
import "./styles.css";
// import { rawProdUS, rawProdEU, rawProdStateFarm } from "./Data";
import { rawProdUS, rawProdEU, rawProdStateFarm } from "./Data-2023-01-06";
import ColorsTable from "./ColorsTable";
import AllColorsTable from "./AllColorsTable";

// const regEx = /\["(?<primary>.*)", "(?<secondary>.*)"\]=>(?<count>\d)/;
const regEx = /\[(?<primary>.*), (?<secondary>.*)\]=>(?<count>\d+)/;
const colorRegEx = /"(?<color>#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})"/;

const getColor = (s) => {
  if (s === "nil") return s;
  const match = s.match(colorRegEx);
  if (match) {
    return match.groups.color;
  }
  return "";
};

const getColors = (rawData) => {
  if (!rawData) {
    return [];
  }
  const data = rawData.split(/\r?\n/);
  return data.map((d, index) => {
    const match = d.match(regEx);
    if (!match) {
      console.log(d, match);
      return {
        primary: null,
      };
    }
    let groups = match.groups;
    const primary = getColor(groups.primary);
    const secondary = getColor(groups.secondary);
    return {
      id: index + 1,
      primary,
      secondary,
      count: parseInt(groups.count, 10),
      isSameColor: primary === secondary,
    };
  });
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const colors = getColors(data);
  // console.log(colors);
  return (
    <div className="App">
      <h3>RON groups with branding. Data collected on January, 6, 2023.</h3>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Prod US" {...a11yProps(0)} />
        <Tab label="Prod EU" {...a11yProps(1)} />
        <Tab label="Prod State Farm" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* <h1>Colors used in Prod US</h1> */}
        {/* <AllColorsTable data={getColors(rawProdUS)} /> */}
        <ColorsTable key="US" data={getColors(rawProdUS)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <h1>Colors used in Prod EU</h1> */}
        {/* <AllColorsTable data={getColors(rawProdEU)} /> */}
        <ColorsTable key="EU" data={getColors(rawProdEU)} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <h1>Colors used in Prod State Farm</h1> */}
        {/* <AllColorsTable data={getColors(rawProdStateFarm)} /> */}
        <ColorsTable key="SF" data={getColors(rawProdStateFarm)} />
      </TabPanel>
      {/* <DataTable /> */}
      {/* <ColorsTable data={getColors(rawProdStateFarm)} /> */}
      {/* <h1>Colors used in Prod US</h1> */}
      {/* <AllColorsTable data={getColors(rawProdUS)} /> */}
      {/* <ColorsTable key="US" data={getColors(rawProdUS)} /> */}

      {/* <h1>Colors used in Prod EU</h1> */}
      {/* <AllColorsTable data={getColors(rawProdEU)} /> */}
      {/* <ColorsTable key="EU" data={getColors(rawProdEU)} /> */}

      {/* <h1>Colors used in Prod State Farm</h1> */}
      {/* <AllColorsTable data={getColors(rawProdStateFarm)} /> */}
      {/* <ColorsTable key="SF" data={getColors(rawProdStateFarm)} /> */}
    </div>
  );
}
