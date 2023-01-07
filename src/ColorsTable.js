import { DataGrid } from "@mui/x-data-grid";

const ColorBox = ({ color }) => {
  if (color.startsWith("#")) {
    return (
      <div style={{ backgroundColor: color, minWidth: "100px" }}>&nbsp;</div>
    );
  }
  return "not set";
};

const SameColorText = ({ isSameColor }) => {
  return isSameColor ? <span>same</span> : <>&nbsp;</>;
};

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "primary", headerName: "Primary color", width: 180 },
  {
    field: "pc",
    headerName: "Primary color box",
    sortable: false,
    width: 160,
    renderCell: (cellValues) => {
      return <ColorBox key="primaryBox" color={cellValues.row.primary} />;
    }
  },
  { field: "secondary", headerName: "Secondary color", width: 180 },
  {
    field: "sc",
    headerName: "Secondary color box",
    sortable: false,
    width: 160,
    renderCell: (cellValues) => {
      return <ColorBox key="secondaryBox" color={cellValues.row.secondary} />;
    }
  },
  {
    field: "count",
    headerName: "Count",
    type: "number",
    width: 130
  },
  {
    field: "isSameColor",
    headerName: "Same color?",
    width: 160,
    renderCell: (cellValues) => {
      return <SameColorText isSameColor={cellValues.row.isSameColor} />;
    }
  }
];

const getTotalCount = (data) => {
  const totalCount = data.reduce(
    (total, currentValue) => total + currentValue.count,
    0
  );
  // console.log(`Total Count: ${totalCount}`);
  return totalCount;
};

export default function ColorsTable({ data }) {
  // console.log(data);
  const totalCount = getTotalCount(data);
  return (
    <div style={{ height: 900, width: "100%" }}>
      <div>Group count: {totalCount}</div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={100}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}
