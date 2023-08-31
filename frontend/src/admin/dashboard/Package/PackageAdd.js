import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import useSWR from "swr";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

// Associated Doctors
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Dr Jalal Abdulla Kamal",
  "Dr Sameera Abdulla Kamal",
  "Dr Leasha Shafik",
  "Dr Munnir Mohammed",
  "Dr Ahmed M Yahya",
  "Dr Fadi A Mouawad",
];
function getStyles(name, doctorName, theme) {
  return {
    fontWeight:
      doctorName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PackageAdd = () => {
  const [packageImageFile, setPackageImageFile] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: doctorsData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors`
  );

  // Package Image Preview
  const [packageCoverImageUrl, setPackageCoverImageUrl] = useState("");
  const handlePackageCoverImageUrl = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const packageCoverImageUrl = URL.createObjectURL(file);
      setPackageCoverImageUrl(packageCoverImageUrl);
      setPackageImageFile(event.target.files[0]);
    }
  };

  // Add Variants to Package
  // const [variants, setVariants] = useState([]);
  // const addVariant = () => {
  //   setVariants((item) => [
  //     ...item,
  //     {
  //       id: Math.random().toString(),
  //     },
  //   ]);
  // };

  // Select Multiple Doctors

  const theme = useTheme();
  const [doctorName, setDoctorName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // CREATE Package
  const handlePackageAdd = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    // Adding only "ID" of doctors to from all the details of doctors - For saving to database
    var doctorsIdForDB = [];
    doctorName.map((item) => {
      doctorsIdForDB.push(item._id.toString());
    });

    const packageValues = {
      "en-US": {
        title: data.get("title"),
        description: data.get("description"),
      },
      "ar-BH": {
        title: data.get("title_ar"),
        description: data.get("description_ar"),
      },
      slug: data.get("slug"),
      packageImage: packageImageFile,
      associatedDoctors: `[${doctorsIdForDB}]`,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/packages`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: packageValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/packages`);
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (packageCoverImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(packageCoverImageUrl);
      }
    };
  }, [packageCoverImageUrl, doctorsData]);

  return (
    <>
      <h1>Add Package</h1>
      <form onSubmit={handlePackageAdd}>
        <Grid container spacing={2} sx={{ mb: 30 }}>
          {/* Title, Slug, Description */}
          <Grid xs={12} sm={12} md={9}>
            <Grid>
              <Card>
                <CardContent>
                  <FormGroup>
                    {/* Package Title */}
                    <TextField
                      label="Title"
                      name="title"
                      size="small"
                      sx={{ mb: 2 }}
                      required
                    />
                    {/* Package Title - ARABIC */}
                    <TextField
                      label="Title - Arabic"
                      name="title_ar"
                      size="small"
                      sx={{ mb: 2 }}
                      required
                    />
                    {/* Package Slug */}
                    <TextField
                      label="Slug"
                      name="slug"
                      size="small"
                      sx={{ mb: 2 }}
                      required
                    />
                    {/* Package Description */}
                    <TextField
                      label="Description"
                      name="description"
                      size="small"
                      multiline
                      minRows={4}
                      sx={{ mb: 2 }}
                      required
                    />
                    {/* Package Description - ARABIC */}
                    <TextField
                      label="Description - Arabic"
                      name="description_ar"
                      size="small"
                      multiline
                      minRows={4}
                      required
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>

            {/* Service Information */}
            <Grid>
              <Card>
                <CardContent>
                  <FormGroup>
                    {/* Department Select */}
                    {/* <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Select Department"
                        name="department"
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        variant="outlined"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {departmentData &&
                          departmentData.data.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.departmentName}
                            </option>
                          ))}
                      </TextField>
                    </Grid> */}

                    {/* Doctors */}
                    <Grid item md={12} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Associated Doctors
                        </InputLabel>
                        <Select
                          fullWidth
                          name="associatedDoctors"
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={doctorName}
                          onChange={handleChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Associated Doctors"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value._id}
                                  label={`${value["en-US"].firstname} ${value["en-US"].lastname}`}
                                />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {doctorsData &&
                            doctorsData.data.map((item) => (
                              <MenuItem
                                key={item._id}
                                value={item}
                                style={getStyles(item._id, doctorName, theme)}
                              >
                                {item["en-US"].firstname}{" "}
                                {item["en-US"].lastname}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={3}>
            {/* Cover Image for Package */}
            <Card>
              <CardContent>
                <FormGroup>
                  <Typography variant="subtitle1">
                    Cover Image for Package
                  </Typography>
                  {packageCoverImageUrl ? (
                    <img
                      src={packageCoverImageUrl}
                      alt="CoverImage"
                      width="240"
                      style={{ marginTop: "1rem" }}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangle"
                      width={240}
                      height={100}
                      sx={{ mt: 1 }}
                    />
                  )}
                  <br />
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" component="label">
                      Upload
                      <input
                        hidden
                        accept=".jpg, .png, .jpeg"
                        type="file"
                        onChange={handlePackageCoverImageUrl}
                      />
                    </Button>
                  </Stack>
                </FormGroup>
              </CardContent>
            </Card>
            {/* Action Buttons for Packages  */}
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
                    Add Package
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
    </>
  );
};

export default PackageAdd;
