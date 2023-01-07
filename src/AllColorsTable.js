import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ColorText = ({ color }) => {
  if (color) return color;
  return <i>empty</i>;
};

const ColorBox = ({ color }) => {
  if (color.startsWith("#")) {
    return (
      <div style={{ backgroundColor: color, minWidth: "100px" }}>&nbsp;</div>
    );
  }
  return "not set";
};

const SameColorText = ({ isSameColor }) => {
  return isSameColor ? "same" : <>&nbsp;</>;
};

export default function AllColorsTable({ data }) {
  const rows = data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Primary color</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Secondary color</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell align="center">Same colors?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">
                <ColorText color={row.primary} />
              </TableCell>
              <TableCell align="center">
                <ColorBox color={row.primary} />
              </TableCell>
              <TableCell align="center">
                <ColorText color={row.secondary} />
              </TableCell>
              <TableCell align="center">
                <ColorBox color={row.secondary} />
              </TableCell>
              <TableCell align="center">{row.count}</TableCell>
              <TableCell align="center">
                <SameColorText isSameColor={row.isSameColor} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
