import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Axios from "axios";
import { useQuill } from "react-quilljs";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const DoctorAdd = () => {
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();
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
    placeholder: "Doctor Qualification Arabic",
  });
  const [values, setValues] = useState({
    firstName: "Firstname",
    lastName: "Lastname",
    email: "Email Address",
    phone: "",
    city: "Manama",
    country: "Bahrain",
  });
  const [loading, setLoading] = useState(false);

  const { data: departmentData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  // Doctor Image Preview
  const [doctorImageFile, setDoctorImageFile] = useState();
  const [doctorData, setDoctorData] = useState({ imageUrl: "" });
  const handleDoctorImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const doctorImageUrl = URL.createObjectURL(file);
      setDoctorData({ imageUrl: doctorImageUrl });
      setDoctorImageFile(event.target.files[0]);
    }
  };

  // CREATE Doctor
  const handleAddDoctor = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const valuedata = {
      "en-US": {
        firstname: data.get("firstName"),
        lastname: data.get("lastName"),
        designation: data.get("designation"),
        qualification: doctorQuill.root.innerHTML,
      },
      "ar-BH": {
        firstname: data.get("firstName_ar"),
        lastname: data.get("lastName_ar"),
        designation: data.get("designation_ar"),
        qualification: doctorQuill_AR.root.innerHTML,
      },
      email: data.get("email"),
      phonenumber: data.get("phone"),
      gender: data.get("gender"),
      city: data.get("city"),
      country: data.get("country"),
      departmentID: data.get("department"),
      imageUrl: doctorImageFile,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/doctors`;
    const options = {
      method: "POST",
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

  useEffect(() => {
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (doctorData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(doctorData.imageUrl);
      }
    };
  }, [doctorData.imageUrl, departmentData]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Add Doctor</h1>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={handleAddDoctor}>
            <Grid container spacing={3}>
              {/* Left Column - Personal Details, Work, Availability */}
              <Grid item lg={8} md={6} xs={12}>
                {/* Personal Details */}
                <Accordion defaultExpanded={true}>
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
                          name="firstName"
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
                          name="lastName"
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
                          label="First name"
                          name="firstName_ar"
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      {/* Last Name | Arabic */}
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Last name"
                          name="lastName_ar"
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
                          name="phone"
                          onChange={handleChange}
                          type="tel"
                          variant="outlined"
                          required
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
                          defaultValue=""
                        >
                          <option value="" disabled>
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
                          onChange={handleChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Work Details */}
                <Card>
                  <CardContent sx={{ mb: "7rem" }}>
                    <Typography variant="h5" gutterBottom>
                      Work Details
                    </Typography>
                    <Grid container spacing={3}>
                      {/* Department Select */}
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Select Department"
                          name="department"
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          variant="outlined"
                          defaultValue="default"
                        >
                          <option value={"default"} disabled>
                            Select Department
                          </option>
                          {departmentData &&
                            departmentData.data.map((item) => (
                              <option value={item._id} key={item._id}>
                                {item["en-US"].departmentName} |{" "}
                                {item["ar-BH"].departmentName}
                              </option>
                            ))}
                        </TextField>
                      </Grid>

                      {/* Designation English */}
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Designation"
                          name="designation"
                          onChange={handleChange}
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
                          required
                          variant="outlined"
                        />
                      </Grid>

                      {/* Qualification */}
                      <Grid item md={12} xs={12}>
                        <Typography variant="body2" gutterBottom>
                          Doctor Qualification
                        </Typography>
                        <div
                          className="quillContainer"
                          ref={doctorQuillRef}
                        ></div>
                      </Grid>
                      {/* Qualification Arabic */}
                      <Grid item md={12} xs={12} sx={{ mt: "6rem" }}>
                        <Typography variant="body2" gutterBottom>
                          Doctor Qualification Arabic
                        </Typography>
                        <div
                          className="quillContainer"
                          ref={doctorQuillRef_AR}
                        ></div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
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
                      <Avatar
                        src={doctorData.imageUrl}
                        sx={{
                          height: 120,
                          mb: 1,
                          width: 120,
                        }}
                      />
                      <Typography color="textPrimary" gutterBottom variant="h5">
                        {values.firstName} {values.lastName}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {values.state} {values.country}
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
                        name="doctorImage"
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
                        disabled={loading}
                        disableElevation
                      >
                        Add Doctor
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
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </div>
  );
};

export default DoctorAdd;
