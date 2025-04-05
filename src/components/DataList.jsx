import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Function to clean markdown formatting like *** and replace it with normal text
function cleanDescription(text) {
  if (typeof text !== "string") return "";
  let newText = text.replace(/\*/g, ""); // Remove * formatting
  newText = newText.replace(/_/g, ""); // Remove _ formatting
  return newText;
}

function DataList({ data, title, secondary, secondaryLabel }) {
  if (!data.length) return null;

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table sx={{ minWidth: 600 }} aria-label={title}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>{secondaryLabel}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:nth-child(even)': { backgroundColor: '#f5f5f5' } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell>{cleanDescription(secondary(item))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataList;