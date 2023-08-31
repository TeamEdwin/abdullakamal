import { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

import "./index.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
};

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
  return dayjs(isoString).format("hh:mm a");
};

export default function DataTable() {
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const [contactIdData, setContactIdData] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    getContactById(id);
  };
  const handleClose = () => {
    setOpen(false);
    setContactIdData(null);
  };

  const getContactById = async (contactId) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/contact-us/${contactId}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options).then((res) => {
      setContactIdData(res.data.data);
    });
  };

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

  const getDataFromDB = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/contact-us`;
    const options = {
      method: "GET",
      url: url,
      headers: {
        "Accept-Language": currentLanguageCode,
      },
    };
    await Axios(options)
      .then((response) => {
        setClickData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (contactIdData) {
      console.log("contactIdData", contactIdData);
    }
    getDataFromDB();
  }, [contactIdData]);

  return (
    <Fragment>
      {contactIdData && contactIdData[0] && (
        <Fragment>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, maxWidth: 500 }}>
              <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {formatDate(contactIdData[0].createdAt)} |{" "}
                    {formatTime(contactIdData[0].createdAt)}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {contactIdData[0].name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {contactIdData[0].mobile}
                  </Typography>
                  <Box
                    className="contactDataMessage"
                    sx={{ overflow: "auto", maxHeight: "60vh" }}
                  >
                    {contactIdData[0].message}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleClose}>
                    Close
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Modal>
        </Fragment>
      )}

      {clickData ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table sx={{ minWidth: 500 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Registration Data</TableCell>
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
                    <Link
                      component={RouterLink}
                      to="#"
                      onClick={() => handleOpen(row._id)}
                    >{`${row.name}`}</Link>
                  </TableCell>
                  <TableCell>{`${row.mobile}`}</TableCell>
                  <TableCell>
                    <div className="contactsMessage">{`${row.message}`}</div>
                  </TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
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
                  rowsPerPageOptions={[5, 10]}
                  colSpan={5}
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
    </Fragment>
  );
}
