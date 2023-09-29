import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import Axios from "axios";
import { useQuill } from "react-quilljs";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Multiselect } from "multiselect-react-dropdown";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import DatePickerMultiple from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";

import "./index.scss";

const formatDate = (isoString) => {
  return dayjs(isoString).format("hh:mma Z");
};

export const DoctorEdit = () => {
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [values, setValues] = useState();
  const [departmentSelected, setDepartmentSelected] = useState([]);
  const [doctorImageFile, setDoctorImageFile] = useState();
  const [loading, setLoading] = useState(false);

  const [slotsDB, setSlotsDB] = useState();
  const [dateValue, setDateValue] = useState([dayjs(new Date())]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeRequired, setTimeRequired] = useState({
    status: false,
    message: "",
  });
  const [slotSubmitBtnLoading, setSlotSubmitBtnLoading] = useState(false);
  const [slotDisplayLoading, setSlotDisplayLoading] = useState(false);

  const [value02, setValue02] = useState([new Date(), new Date()]);
  const [startTime02, setStartTime02] = useState(null);
  const [endTime02, setEndTime02] = useState(null);
  const [slotSubmitBtnLoading02, setSlotSubmitBtnLoading02] = useState(false);

  const { quill: doctorQuill, quillRef: doctorQuillRef } = useQuill({
    modules: {
      toolbar: [
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [3, false] }],
      ],
    },
    placeholder: "Doctor Qualification",
  });

  const { quill: doctorQuill_AR, quillRef: doctorQuillRef_AR } = useQuill({
    modules: {
      toolbar: [
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [3, false] }],
      ],
    },
    placeholder: "Doctor Qualification",
  });

  const { data: doctorDataById } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors/${doctorId}`
  );

  const { data: departmentData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  // Doctor Image Preview
  const [doctorData, setDoctorData] = useState({ imageUrl: "" });
  const handleDoctorImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const doctorImageUrl = URL.createObjectURL(file);
      setDoctorData({ imageUrl: doctorImageUrl });
      setDoctorImageFile(event.target.files[0]);
    }
  };

  // READ Doctor By Id
  const getDoctorById = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/doctors/${doctorId}`;
    const options = {
      method: "GET",
      url: url,
      headers: {
        "Accept-Language": currentLanguageCode,
      },
    };
    await Axios(options).then((res) => {
      setValues(res.data.data);
      setDepartmentSelected(res.data.data.departmentID);
      if (doctorQuill) {
        doctorQuill.clipboard.dangerouslyPasteHTML(
          res.data.data["en-US"].qualification
        );
      }
      if (doctorQuill_AR) {
        doctorQuill_AR.clipboard.dangerouslyPasteHTML(
          res.data.data["ar-BH"].qualification
        );
      }
    });
  };

  // UPDATE Doctor
  const handleEditDoctor = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    // Multiselection of Department
    // Pushing only "ID" of department from all the details of department - For saving to database
    var departmentIdForDB = [];
    departmentSelected.map((item) => {
      departmentIdForDB.push(item._id.toString());
    });

    const valuedata = {
      "en-US": {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        designation: data.get("designation"),
        qualification: doctorQuill.root.innerHTML,
      },
      "ar-BH": {
        firstname: data.get("firstname_ar"),
        lastname: data.get("lastname_ar"),
        designation: data.get("designation_ar"),
        qualification: doctorQuill_AR.root.innerHTML,
      },
      email: data.get("email"),
      phonenumber: data.get("phonenumber"),
      gender: data.get("gender"),
      city: data.get("city"),
      country: data.get("country"),
      departmentID: `[${departmentIdForDB}]`,
      // departmentID: data.get("department"),
      imageUrl: doctorImageFile,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/doctors/${doctorId}`;
    const options = {
      method: "PUT",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept-Language": currentLanguageCode,
      },
      data: valuedata,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/doctor`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // DELETE Doctor
  const deleteDoctor = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/doctors/${doctorId}`;
    const options = {
      method: "DELETE",
      url: url,
      headers: {
        "Accept-Language": currentLanguageCode,
      },
    };
    await Axios(options)
      .then(() => {
        setLoading(false);
        navigate(`/dashboard/doctor`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleDoctorDelete = () => {
    let text = "Are you sure, Want to Delete the Doctor?";
    if (window.confirm(text) === true) {
      deleteDoctor();
    } else {
    }
  };

  // READ Slots
  const getAllSlotsByDoctorAndDate = async (selectedDate) => {
    setSlotDisplayLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/slots/doctor/${doctorId}/date/${selectedDate}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setSlotsDB(res.data.data);
        setSlotDisplayLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSlotDisplayLoading(false);
      });
  };

  // CREATE Slot
  const handleSlotAddSubmit = async (event) => {
    event.preventDefault();
    if (!startTime || !endTime) {
      return setTimeRequired({
        status: true,
        message: "Please select the Time",
      });
    }
    if (!dateValue) {
      return setTimeRequired({
        status: true,
        message: "Please select the Date",
      });
    }
    setSlotSubmitBtnLoading(true);
    const values = {
      appointmentDate: dayjs(dateValue).format("YYYY-MM-DD"),
      doctor: doctorId,
      startTime: dayjs(startTime).format(),
      endTime: dayjs(endTime).format(),
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/slots`;
    const options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };
    await Axios(options)
      .then((res) => {
        setSlotSubmitBtnLoading(false);
        getAllSlotsByDoctorAndDate(dayjs(dateValue).format("YYYY-MM-DD"));
        setStartTime(null);
        setEndTime(null);
      })
      .catch((error) => {
        setSlotSubmitBtnLoading(false);
        console.log(error);
      });
  };

  // CREATE Multiple Slot
  const handleSlotMultipleAddSubmit = async (event) => {
    event.preventDefault();
    if (!startTime02 || !endTime02) {
      return setTimeRequired({
        status: true,
        message: "Please select the Time",
      });
    }
    if (!value02) {
      return setTimeRequired({
        status: true,
        message: "Please select the Date",
      });
    }
    setSlotSubmitBtnLoading02(true);

    var start = new Date(value02[0]);
    var end = new Date(value02[1]);
    var loop = new Date(start);
    var allDateInBetween = [];
    while (loop <= end) {
      allDateInBetween.push(dayjs(loop).format("YYYY-MM-DD"));
      var newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }

    const values = {
      slotDates: allDateInBetween,
      doctor: doctorId,
      startTime: dayjs(startTime02).format(),
      endTime: dayjs(endTime02).format(),
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/slotsmultiple`;
    const options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };
    // console.log(options);
    await Axios(options)
      .then((res) => {
        setSlotSubmitBtnLoading02(false);
        setStartTime02(null);
        setEndTime02(null);
        setValue02([start, end]);
      })
      .catch((error) => {
        setSlotSubmitBtnLoading02(false);
        console.log(error);
      });
  };

  // DELETE Slot
  const handleSlotDelete = async (slotId) => {
    let text = "Are you sure, Want to Delete the Slot?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/slots/${slotId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then((res) => {
          getAllSlotsByDoctorAndDate(dayjs(dateValue).format("YYYY-MM-DD"));
        })
        .catch((error) => {
          console.log("Slot Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getDoctorById();
    getAllSlotsByDoctorAndDate(dayjs(dateValue).format("YYYY-MM-DD"));
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (doctorData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(doctorData.imageUrl);
      }
    };
  }, [doctorDataById, doctorData.imageUrl, doctorId, doctorQuill, dateValue]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleMultiSelectAssociatedDepartments = async (event) => {
    setDepartmentSelected(event);
  };

  // Time Required Toast Message
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTimeRequired({ status: false, message: "" });
  };

  return (
    <div>
      {timeRequired.status && (
        <Snackbar
          open={timeRequired.status}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {timeRequired.message}
          </Alert>
        </Snackbar>
      )}

      <h1>Edit Doctor</h1>

      <form onSubmit={handleEditDoctor}>
        {doctorDataById && departmentData && values && (
          <Grid container spacing={3}>
            {/* Left Column - Personal Details, Work, Availability */}
            <Grid item lg={8} md={6} xs={12}>
              {/* Personal Details */}
              <Accordion defaultExpanded={false}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Personal Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {/* First Name */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="First name"
                        name="firstname"
                        defaultValue={values["en-US"].firstname}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    {/* Last Name */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Last name"
                        name="lastname"
                        defaultValue={values["en-US"].lastname}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    {/* First Name | Arabic */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="First name Arabic"
                        name="firstname_ar"
                        defaultValue={values["ar-BH"].firstname}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    {/* Last Name | Arabic */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Last name Arabic"
                        name="lastname_ar"
                        defaultValue={values["ar-BH"].lastname}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    {/* Email Address */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        type="email"
                        label="Email Address"
                        defaultValue={values.email}
                        name="email"
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    {/* Phone Number */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phonenumber"
                        defaultValue={values.phonenumber}
                        onChange={handleChange}
                        type="tel"
                        variant="outlined"
                      />
                    </Grid>
                    {/* Gender */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        variant="outlined"
                        defaultValue={values.gender}
                      >
                        <option value="defaultSelected" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                        <option value="preferNotToSay">
                          Prefer Not To Say
                        </option>
                      </TextField>
                    </Grid>
                    {/* City */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    {/* Country */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Work Details */}
              {/* <Card>
                <CardContent sx={{ mb: "7rem" }}> */}
              <Accordion defaultExpanded={false}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5" gutterBottom>
                    Work Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {/* Department Select */}
                    <Grid item md={12} xs={12}>
                      {/* <TextField
                            fullWidth
                            label="Select Department"
                            name="department"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            variant="outlined"
                            defaultValue={values.departmentID[0]._id || ""}
                          >
                            <option value="" disabled>
                              Select Department
                            </option>
                            {departmentData &&
                              departmentData.data.map((item) => (
                                <option value={item._id} key={item._id}>
                                  {item["en-US"].departmentName}
                                </option>
                              ))}
                          </TextField> */}
                      <Multiselect
                        name="multiselectDoctors"
                        options={departmentData.data} // Options to display in the dropdown
                        selectedValues={departmentSelected} // Preselected value to persist in dropdown
                        displayValue="slug" // Property name to display in the dropdown options
                        onRemove={handleMultiSelectAssociatedDepartments}
                        onSelect={handleMultiSelectAssociatedDepartments}
                      />
                    </Grid>

                    {/* Designation */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Designation"
                        name="designation"
                        onChange={handleChange}
                        defaultValue={values["en-US"].designation}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    {/* Designation Arabic */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Designation Arabic"
                        name="designation_ar"
                        onChange={handleChange}
                        defaultValue={values["ar-BH"].designation}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    {/* Qualification */}
                    <Grid item md={12} xs={12} sx={{ paddingBottom: "5rem" }}>
                      <Typography variant="body2" gutterBottom>
                        Doctor Qualification
                      </Typography>
                      <div className="quillContainer" ref={doctorQuillRef} />
                    </Grid>

                    {/* Qualification Arabic */}
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sx={{ mt: "6rem", paddingBottom: "10rem" }}
                    >
                      <Typography variant="body2" gutterBottom>
                        Doctor Qualification Arabic
                      </Typography>
                      <div
                        className="quillContainer"
                        ref={doctorQuillRef_AR}
                      ></div>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              {/* </CardContent>
              </Card> */}
            </Grid>

            {/* Right Column - Profile Image */}
            <Grid item lg={4} md={6} xs={12}>
              {/* Profile Image & Preview Details */}
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {doctorImageFile ? (
                      <Avatar
                        src={doctorData.imageUrl}
                        sx={{
                          height: 120,
                          mb: 1,
                          width: 120,
                        }}
                      />
                    ) : (
                      <Avatar
                        src={values.imageUrl}
                        sx={{
                          height: 120,
                          mb: 1,
                          width: 120,
                        }}
                      />
                    )}

                    <Typography color="textPrimary" gutterBottom variant="h5">
                      {values["en-US"].firstname} {values["en-US"].lastname}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {values.city} {values.country}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {values.email}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    component="label"
                  >
                    Upload picture
                    <input
                      hidden
                      name="imageUrl"
                      accept="image/*"
                      type="file"
                      onChange={handleDoctorImageUpload}
                    />
                  </Button>
                </CardActions>
              </Card>

              {/* Action Buttons  */}
              <Card sx={{ mt: 2 }}>
                <CardHeader subheader="Actions" />
                <CardContent></CardContent>
                <CardActions>
                  <Box sx={{ position: "relative" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disableElevation
                      disabled={loading}
                    >
                      Update Doctor
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-1.2rem",
                          marginLeft: "-1rem",
                        }}
                      />
                    )}
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    disableElevation
                    onClick={handleDoctorDelete}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </form>

      <Grid container spacing={3} sx={{ mt: "2rem" }}>
        <Grid item lg={12} md={12} xs={12}>
          {/* Appointment Availability */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Appointments Slots
              </Typography>

              {/* Date Picker */}
              <Box sx={{ float: "right", paddingBottom: "2rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["day"]}
                    size="small"
                    label="Select Date"
                    minDate={new Date()}
                    maxDate={dayjs(new Date()).add(30, "day")}
                    value={dateValue}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Selected Date: {dayjs(dateValue).format("MMM DD, YYYY")}
              </Typography>

              <form onSubmit={handleSlotAddSubmit}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="baseline"
                  sx={{ padding: "2rem 0" }}
                >
                  {/* Time Picker - Start Time */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start Time"
                      size="small"
                      value={startTime}
                      onChange={(newValue) => {
                        setStartTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  {/* Time Picker - End Time */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => {
                        setEndTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <Box sx={{ position: "relative" }}>
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={slotSubmitBtnLoading}
                    >
                      Add Slot
                    </Button>
                    {slotSubmitBtnLoading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-1.2rem",
                          marginLeft: "-1rem",
                        }}
                      />
                    )}
                  </Box>
                </Stack>
              </form>
              <Divider />
              <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
                Time Slots
              </Typography>
              {slotDisplayLoading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    marginTop: "1.2rem",
                    marginLeft: "1rem",
                  }}
                />
              ) : (
                <Stack direction="row" spacing={1}>
                  {slotsDB && slotsDB.length <= 0 ? (
                    <Typography variant="subtitle1" gutterBottom>
                      Not Available
                    </Typography>
                  ) : (
                    slotsDB &&
                    slotsDB.map((item) => (
                      <Chip
                        key={item._id}
                        label={`${formatDate(item.startTime)} - ${formatDate(
                          item.endTime
                        )}`}
                        color="primary"
                        onDelete={() => handleSlotDelete(item._id)}
                      />
                    ))
                  )}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: "2rem", mb: "10rem" }}>
        <Grid item lg={12} md={12} xs={12}>
          {/* Appointment Availability */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Multiple Appointments Slots
              </Typography>
              <DatePickerMultiple
                value={value02}
                onChange={setValue02}
                minDate={new Date()}
                maxDate={dayjs(new Date()).add(30, "day")}
                format="MM/DD/YYYY"
                range
                render={<InputIcon />}
              />
              <form onSubmit={handleSlotMultipleAddSubmit}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="baseline"
                  sx={{ padding: "2rem 0" }}
                >
                  {/* Time Picker - Start Time */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start Time"
                      size="small"
                      value={startTime02}
                      onChange={(newValue) => {
                        setStartTime02(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  {/* Time Picker - End Time */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="End Time"
                      value={endTime02}
                      onChange={(newValue) => {
                        setEndTime02(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <Box sx={{ position: "relative" }}>
                    <Button
                      type="submit"
                      variant="outlined"
                      disabled={slotSubmitBtnLoading02}
                    >
                      Add Slot
                    </Button>
                    {slotSubmitBtnLoading02 && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-1.2rem",
                          marginLeft: "-1rem",
                        }}
                      />
                    )}
                  </Box>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorEdit;
