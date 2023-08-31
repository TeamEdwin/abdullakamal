import { useEffect } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import useSWR from "swr";
import { Avatar, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DoctorAll = () => {
  const { data: doctorsDetails } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors`
  );

  useEffect(() => {}, [doctorsDetails]);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ float: "right" }}
        component={RouterLink}
        to="add"
      >
        New Doctor
      </Button>
      <h1>Doctors</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 1155, mt: 5 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">View Appointments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorsDetails &&
              doctorsDetails.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ alignItems: "center", display: "flex" }}>
                      <Avatar src={row.imageUrl} sx={{ mr: 2 }}></Avatar>
                      <Typography color="textPrimary" variant="body1">
                        <Link to={`${row._id}/edit`} className="table__link">
                          {row["en-US"].firstname} {row["en-US"].lastname}
                        </Link>
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {row.departmentID.map((item) => (
                      <span key={item._id}>{item["en-US"].departmentName}, </span>
                    ))}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      component={RouterLink}
                      to={`/dashboard/appointments?doc=${row._id}`}
                      variant="text"
                      size="small"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DoctorAll;
