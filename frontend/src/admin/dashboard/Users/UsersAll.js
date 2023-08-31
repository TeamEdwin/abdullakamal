import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import useSWR from "swr";
import Axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { getCookie } from "../../../context/helpers";

const UsersAll = () => {
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const [usersDB, setUsersDB] = useState();
  const { data: userData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/users`
  );

  useEffect(() => {}, [usersDB]);

  return (
    <>
      <h1>All Users</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData && userData.data.length !== 0 ? (
              userData.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Button
                      component={RouterLink}
                      to={`${row._id}/edit`}
                      variant="text"
                      size="small"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={5} align="center">
                  No Users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersAll;
