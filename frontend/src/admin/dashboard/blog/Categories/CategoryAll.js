import { useEffect } from "react";
import useSWR from "swr";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, Link as RouterLink } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CategoryAll = () => {
  const { data: categoryData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/categories`
  );

  useEffect(() => {}, [categoryData]);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ float: "right" }}
        component={RouterLink}
        to="add"
      >
        New Category
      </Button>
      <h1>Blog Category</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 650, mt: 5 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Slug</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryData && categoryData.data.length !== 0 ? (
              categoryData.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`${row._id}/edit`} className="table__link">
                      {row["en-US"].title} | {row["ar-BH"].title}
                    </Link>
                  </TableCell>
                  <TableCell>{row["en-US"].description}</TableCell>
                  <TableCell>{row.slug}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={3} align="center">
                  No Category
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoryAll;
