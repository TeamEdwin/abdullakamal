import { Link, Link as RouterLink } from "react-router-dom";

import { Avatar, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import useSWR from "swr";

const PackageAll = () => {
  const { data: packagesData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/packages`
  );

  useEffect(() => {
    if(packagesData) {
      console.log(packagesData.data);
    }
  }, [packagesData]);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ float: "right" }}
        component={RouterLink}
        to="add"
      >
        New Package
      </Button>
      <h1>Packages</h1>

      <TableContainer component={Paper} sx={{ maxWidth: 1155, mt: 5 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Package Title</TableCell>
              <TableCell>Package Slug</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packagesData &&
              packagesData.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ alignItems: "center", display: "flex" }}>
                      <Avatar
                        src={row.packageImage}
                        sx={{ mr: 2 }}
                        variant="rounded"
                      ></Avatar>
                      <Typography color="textPrimary" variant="body1">
                        <Link to={`${row._id}/edit`} className="table__link">
                          {row["en-US"].title}
                        </Link>
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.slug}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PackageAll;
