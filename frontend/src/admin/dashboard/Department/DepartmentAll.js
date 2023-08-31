import { useEffect } from "react";
import useSWR from "swr";
import { Avatar, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, Link as RouterLink } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./index.scss";

// const rows = [
//   {
//     id: 1,
//     coverImage: "/assets/covers/pexels-pavel-danilyuk-6753427-full.jpg",
//     departmentName: "Family Medicine",
//     description: "-",
//     slug: "family-medicine",
//     noOfStaff: 24,
//   },
//   {
//     id: 2,
//     coverImage: "/assets/covers/pexels-pavel-danilyuk-6753427-full.jpg",
//     departmentName: "General Practice",
//     description: "-",
//     slug: "general-practice",
//     noOfStaff: 37,
//   },
//   {
//     id: 3,
//     coverImage: "/assets/covers/pexels-pavel-danilyuk-6753427-full.jpg",
//     departmentName: "Psychiatry",
//     description: "-",
//     slug: "psychiatry",
//     noOfStaff: 24,
//   },
//   {
//     id: 4,
//     coverImage: "/assets/covers/pexels-pavel-danilyuk-6753427-full.jpg",
//     departmentName: "Neurology",
//     description: "-",
//     slug: "neurology",
//     noOfStaff: 67,
//   },
//   {
//     id: 5,
//     coverImage: "/assets/covers/pexels-pavel-danilyuk-6753427-full.jpg",
//     departmentName: "Pediatrics",
//     description: "-",
//     slug: "pediatrics",
//     noOfStaff: 49,
//   },
// ];
const DepartmentAll = () => {
  const { data: departmentData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  useEffect(() => {}, [departmentData]);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ float: "right" }}
        component={RouterLink}
        to="add"
      >
        New Department
      </Button>
      <h1>Department</h1>
      <Grid container>
        <Grid item lg={10} md={10} xs={12} sx={{ mt: 5 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Cover</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Slug</TableCell>
                  {/* <TableCell>Number of Doctors</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {departmentData &&
                  departmentData.data.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Avatar
                          src={row.coverImage}
                          sx={{ mr: 2 }}
                          variant="rounded"
                        ></Avatar>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`${row._id}/edit`} className="table__link">
                          {row["en-US"].departmentName}
                        </Link>
                      </TableCell>
                      <TableCell>{row.slug}</TableCell>
                      {/* <TableCell>0</TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default DepartmentAll;
