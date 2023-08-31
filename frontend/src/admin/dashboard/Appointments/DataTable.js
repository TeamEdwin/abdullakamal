import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Axios from "axios";
import dayjs from "dayjs";
import { Button } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const formatDate = (isoString) => {
  return dayjs(isoString).format("MMM DD, YYYY");
};

const formatTime = (isoString) => {
  return dayjs(isoString).format("hh:mma");
};

export default function DataTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [clickData, setClickData] = useState();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clickData.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDataFromDB = async (doctorid, selectedDate) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/appointmentbydoctoranddate/${doctorid}/${selectedDate}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((response) => {
        setClickData(response.data.appointments);
      })
      .catch((error) => console.log(error));
  };

  const handleAppointmentDelete = async (appointmentId) => {
    let text = "Are you sure, Want to Delete the Doctor?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/appointment/${appointmentId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then((res) => {
          getDataFromDB(props.doctorId, props.selectedDate);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Delete alert closed!");
    }
  };

  useEffect(() => {
    getDataFromDB(props.doctorId, props.selectedDate);
  }, [props.selectedDate]);

  return (
    <>
      {clickData ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 500 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Appointment</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? clickData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : clickData
              ).map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {`${row.doctorName["en-US"].firstname}`}{" "}
                    {`${row.doctorName["en-US"].lastname}`}
                  </TableCell>
                  <TableCell>
                    {`${formatTime(row.appointmentStartTime)} - ${formatTime(
                      row.appointmentEndTime
                    )}`}
                  </TableCell>
                  <TableCell>{`${row.patientName}`}</TableCell>
                  <TableCell>{`${row.patientEmail}`}</TableCell>
                  <TableCell>{row.patientPhone}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleAppointmentDelete(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
                  count={clickData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
}
