import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import useSWR from "swr";
import { useQuill } from "react-quilljs";
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
import { Multiselect } from "multiselect-react-dropdown";

import "./index.scss";

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
  { id: 1, firstname: "Dr Jalal Abdulla Kamal" },
  { id: 2, firstname: "Dr Sameera Abdulla Kamal" },
  { id: 3, firstname: "Dr Leasha Shafik" },
  { id: 4, firstname: "Dr Munnir Mohammed" },
  { id: 5, firstname: "Dr Ahmed M Yahya" },
  { id: 6, firstname: "Dr Fadi A Mouawad" },
];

function getStyles(name, doctorName, theme) {
  return {
    fontWeight:
      doctorName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PackageEdit = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const { quill: packageVariantQuill, quillRef: packageVariantQuillRef } =
    useQuill({
      modules: {
        toolbar: [
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [3, false] }],
        ],
      },
      placeholder: "Variant Description",
    });
  const { quill: packageVariantQuill_AR, quillRef: packageVariantQuillRef_AR } =
    useQuill({
      modules: {
        toolbar: [
          [{ list: "ordered" }, { list: "bullet" }],
          [{ header: [3, false] }],
        ],
      },
      placeholder: "Variant Description",
    });
  const [loading, setLoading] = useState(false);
  const [packageImageFile, setPackageImageFile] = useState();
  const [packageData, setPackageData] = useState();

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

  const theme = useTheme();
  const [doctorsDBData, setDoctorsDBData] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState([]);
  // const handleChange = async (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setDoctorName(value);
  //   console.log("doctorName", doctorName);
  // };
  const [step, setStep] = useState(0.01);
  const [eth, setEth] = useState(0);

  const handleMultiSelectAssociatedDoctors = async (event) => {
    setDoctorSelected(event);
  };

  // READ Package by ID
  const getPackageById = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/packages/${packageId}`;
    const options = {
      method: "GET",
      url: url,
      headers: {
        "Accept-Language": currentLanguageCode,
      },
    };
    await Axios(options)
      .then((res) => {
        setPackageData(res.data.data);

        res.data.data.associatedDoctors.forEach((option) => {
          option.name =
            option["en-US"].firstname + " " + option["en-US"].lastname;
        });

        doctorsData.data.forEach((option) => {
          option.name =
            option["en-US"].firstname + " " + option["en-US"].lastname;
        });

        setDoctorSelected(res.data.data.associatedDoctors);
      })
      .catch((err) => console.log(err));
  };

  // UPDATE Package
  const handleUpdatePackage = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    // Adding only "ID" of doctors to from all the details of doctors - For saving to database
    var doctorsIdForDB = [];
    doctorSelected.map((item) => {
      doctorsIdForDB.push(item._id.toString());
    });

    const valuedata = {
      "en-US": {
        title: data.get("title"),
        description: data.get("description"),
      },
      "ar-BH": {
        title: data.get("title_ar"),
        description: data.get("description_ar"),
      },
      slug: data.get("slug"),
      // departmentID: data.get("department"),
      packageImage: packageImageFile,
      associatedDoctors: `[${doctorsIdForDB}]`,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/packages/${packageId}`;
    const options = {
      method: "PUT",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: valuedata,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/packages`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // DELETE Package
  const deletePackageById = async () => {
    let text = "Are you sure, Want to Delete the Package?";
    if (window.confirm(text) === true) {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/packages/${packageId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          setLoading(false);
          navigate(`/dashboard/packages`);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
    }
  };

  // CREATE Variants
  const handleAddVariant = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const packageVariantValues = {
      "en-US": {
        title: data.get("variantTitle"),
        description: packageVariantQuill.root.innerHTML,
      },
      "ar-BH": {
        title: data.get("variantTitle_ar"),
        description: packageVariantQuill_AR.root.innerHTML,
      },
      price: data.get("variantPrice"),
      // currency: data.get("currency"),
      packageID: packageId,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/variant`;
    const options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        "Accept-Language": currentLanguageCode,
      },
      data: packageVariantValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("Variant Added!", res);
        getPackageById();
        if (packageVariantQuill) {
          packageVariantQuill.clipboard.dangerouslyPasteHTML("");
        }
        if (packageVariantQuill_AR) {
          packageVariantQuill_AR.clipboard.dangerouslyPasteHTML("");
        }
        event.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DELETE VARIANTS
  const handleVariantDelete = async (variantID) => {
    let text = "Are you sure, Want to Delete the Variant?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/variant/${variantID}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          getPackageById();
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          console.log("Variant Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getPackageById(packageId);
    if (doctorsData) {
      setDoctorsDBData(doctorsData.data);
    }

    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (packageCoverImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(packageCoverImageUrl);
      }
    };
  }, [packageCoverImageUrl, doctorsData]);

  return (
    <>
      <h1>Package Edit</h1>
      {packageData && doctorsDBData && (
        <Fragment>
          <form onSubmit={handleUpdatePackage}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={9}>
                {/* Title, Slug, Description */}
                <Grid>
                  <Card>
                    <CardContent>
                      <FormGroup>
                        {/* Package Title */}
                        <TextField
                          label="Title"
                          name="title"
                          size="small"
                          defaultValue={packageData["en-US"].title}
                          sx={{ mb: 2 }}
                          required
                        />
                        {/* Package Title */}
                        <TextField
                          label="Title - Arabic"
                          name="title_ar"
                          size="small"
                          defaultValue={packageData["ar-BH"].title}
                          sx={{ mb: 2 }}
                          required
                        />
                        {/* Package Slug */}
                        <TextField
                          label="Slug"
                          name="slug"
                          size="small"
                          defaultValue={packageData.slug}
                          sx={{ mb: 2 }}
                          required
                        />
                        {/* Package Description */}
                        <TextField
                          label="Description"
                          name="description"
                          size="small"
                          defaultValue={packageData["en-US"].description}
                          multiline
                          minRows={4}
                          sx={{ mb: 2 }}
                          required
                        />
                        {/* Package Description - Arabic */}
                        <TextField
                          label="Description - Arabic"
                          name="description_ar"
                          size="small"
                          defaultValue={packageData["ar-BH"].description}
                          multiline
                          minRows={4}
                          required
                        />
                      </FormGroup>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Associated Doctors */}
                <Grid>
                  <Accordion defaultExpanded={false}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="subtitle">
                        Associate Doctors
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormGroup>
                        <Multiselect
                          name="multiselectDoctors"
                          options={doctorsDBData} // Options to display in the dropdown
                          selectedValues={doctorSelected} // Preselected value to persist in dropdown
                          displayValue="name" // Property name to display in the dropdown options
                          onRemove={handleMultiSelectAssociatedDoctors}
                          onSelect={handleMultiSelectAssociatedDoctors}
                        />
                      </FormGroup>
                    </AccordionDetails>
                  </Accordion>
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
                        <img
                          src={packageData.packageImage}
                          alt="CoverImage"
                          width="240"
                          style={{ marginTop: "1rem" }}
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
                    <Box sx={{ position: "relative", mr: "1rem" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        disableElevation
                      >
                        Update Package
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
                    <br />
                    <Button
                      type="submit"
                      variant="outlined"
                      color="error"
                      onClick={() => deletePackageById()}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </form>

          <Grid container spacing={2} sx={{ mb: 30 }}>
            {/* New Variants Form */}
            <Grid xs={12} sm={12} md={9}>
              <Grid>
                <Card>
                  <CardHeader title="New Variant" />
                  <form onSubmit={handleAddVariant}>
                    <CardContent>
                      <Grid container spacing={3}>
                        {/* Variant Title */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Title"
                            name="variantTitle"
                            required
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        {/* Variant Title */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Title - Arabic"
                            name="variantTitle_ar"
                            required
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        {/* Variant Price */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Price"
                            name="variantPrice"
                            type="number"
                            min={0}
                            step={step}
                            onChange={e => {
                              setEth(e.target.value);
                            }}
                            value={eth}
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        {/* Variant Description */}
                        <Grid item md={12} xs={12}>
                          <div
                            className="quillContainer"
                            ref={packageVariantQuillRef}
                          />
                        </Grid>
                        {/* Variant Description */}
                        <Grid item md={12} xs={12} sx={{ mt: "5rem" }}>
                          <div
                            className="quillContainer"
                            ref={packageVariantQuillRef_AR}
                          />
                        </Grid>
                        <Divider />
                      </Grid>
                    </CardContent>
                    <CardActions sx={{ float: "right", mt: "2rem" }}>
                      {/* Variant Action Button */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          p: 2,
                        }}
                      >
                        <Button type="submit" variant="contained">
                          Add Variant
                        </Button>
                      </Box>
                    </CardActions>
                  </form>
                </Card>
              </Grid>
            </Grid>
            {/* READ - Package Variant */}
            <Grid xs={12} sm={12} md={9}>
              {packageData &&
                packageData.variants.map((item, i) => (
                  <Card key={i} sx={{ mb: "2rem" }}>
                    <CardContent>
                      <Grid container>
                        <Grid item md={8} sm={12}>
                          <Typography variant="h5" gutterBottom>
                            {item["en-US"].title} | {item["ar-BH"].title}
                          </Typography>
                          {item.price ? (
                            <Typography variant="subtitle1" gutterBottom>
                              {item.price} BHD
                            </Typography>
                          ) : null}
                          <Typography
                            variant="body2"
                            component="div"
                            gutterBottom
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item["en-US"].description,
                              }}
                            ></div>
                          </Typography>
                          <hr />
                          <Typography
                            variant="body2"
                            component="div"
                            gutterBottom
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item["ar-BH"].description,
                              }}
                            ></div>
                          </Typography>
                        </Grid>
                      </Grid>
                      <div className="text-right">
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleVariantDelete(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <Divider sx={{ my: 1 }} />
                    </CardContent>
                  </Card>
                ))}
            </Grid>
          </Grid>
        </Fragment>
      )}
    </>
  );
};

export default PackageEdit;
