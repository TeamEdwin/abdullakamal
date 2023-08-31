import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import useSWR from "swr";
import { useQuill } from "react-quilljs";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  FormGroup,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactSVG } from "react-svg";

import "./index.scss";

export const DepartmentEdit = () => {
  const { departmentId } = useParams();
  const { quill: departmentQuill, quillRef: departmentQuillRef } = useQuill({
    modules: {
      toolbar: [[{ list: "ordered" }, { list: "bullet" }]],
    },
    placeholder: "Department Description",
  });
  const { quill: departmentQuill_AR, quillRef: departmentQuillRef_AR } =
    useQuill({
      modules: {
        toolbar: [[{ list: "ordered" }, { list: "bullet" }]],
      },
      placeholder: "Department Description",
    });
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    severity: "",
    message: "",
  });

  // READ Department By Id
  const getDepartmentById = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/department/id/${departmentId}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options).then((res) => {
      setDepartmentData(res.data.data);
      if (departmentQuill) {
        departmentQuill.clipboard.dangerouslyPasteHTML(
          res.data.data["en-US"].description
        );
      }
      if (departmentQuill_AR) {
        departmentQuill_AR.clipboard.dangerouslyPasteHTML(
          res.data.data["ar-BH"].description
        );
      }
    });
  };

  // Department Cover Image Preview
  const [coverImageFile, setCoverImageFile] = useState();
  const [departmentCoverImageUrl, setDepartmentCoverImageUrl] = useState("");
  const handleDepartmentCoverImage = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const departmentCoverImageUrl = URL.createObjectURL(file);
      setDepartmentCoverImageUrl(departmentCoverImageUrl);
      setCoverImageFile(event.target.files[0]);
    }
  };

  // Department SVG Icon Preview
  const [svgImageFile, setSvgImageFile] = useState();
  const [departmentSVGIconUrl, setDepartmentSVGIconUrl] = useState("");
  const handleDepartmentSVGIcon = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const departmentSVGIconUrl = URL.createObjectURL(file);
      setDepartmentSVGIconUrl(departmentSVGIconUrl);
      setSvgImageFile(event.target.files[0]);
    }
  };

  // DELETE Department handler
  const deleteDepartment = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/department/${departmentId}`;
    const options = {
      method: "DELETE",
      url: url,
    };
    await Axios(options)
      .then(() => {
        navigate(`/dashboard/department`);
        setLoading(false);
        console.log("Deleted Successfully");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Department Error", error);
        setToast({
          open: true,
          severity: "warning",
          message: error.response.data.message,
        });
      });
  };
  const handleDepartmentDelete = () => {
    let text = "Are you sure, Want to Delete the Department?";
    if (window.confirm(text) === true) {
      deleteDepartment();
      console.log("You pressed OK!");
    } else {
      console.log("You canceled!");
    }
  };

  // UPDATE Department handler
  const handleUpdateDepartment = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const valuedata = {
      "en-US": {
        departmentName: data.get("title_en"),
        description: departmentQuill.root.innerHTML,
      },
      "ar-BH": {
        departmentName: data.get("title_ar"),
        description: departmentQuill_AR.root.innerHTML,
      },
      slug: data.get("slug"),
      coverImage: coverImageFile,
      svgImage: svgImageFile,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/department/${departmentId}`;
    const options = {
      method: "PUT",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: valuedata,
    };
    // console.log(options);
    await Axios(options)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate(`/dashboard/department`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDepartmentById();

    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (departmentCoverImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(departmentCoverImageUrl);
      }
      if (departmentSVGIconUrl.startsWith("blob:")) {
        URL.revokeObjectURL(departmentSVGIconUrl);
      }
    };
  }, [
    departmentId,
    departmentCoverImageUrl,
    departmentSVGIconUrl,
    departmentQuill,
    departmentQuill_AR,
  ]);

  const handleChange = (event) => {
    setDepartmentData({
      ...departmentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ open: false, severity: "", message: "" });
  };

  return (
    <>
      {toast.open && (
        <Snackbar
          open={toast.open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={toast.severity}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}

      <h1>Edit Department</h1>
      <form onSubmit={handleUpdateDepartment}>
        <Grid container spacing={2}>
          {departmentData && (
            <Grid xs={12} sm={12} md={9}>
              <Grid>
                <Card>
                  <CardContent>
                    <FormGroup>
                      {/* Department Title */}
                      <TextField
                        label="Title"
                        name="title_en"
                        defaultValue={departmentData["en-US"].departmentName}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                        required
                      />
                      <TextField
                        label="Title"
                        name="title_ar"
                        defaultValue={departmentData["ar-BH"].departmentName}
                        onChange={handleChange}
                        size="small"
                        sx={{ mb: 2 }}
                        required
                      />
                      {/* Department Slug */}
                      <TextField
                        label="Slug"
                        name="slug"
                        value={departmentData.slug}
                        onChange={handleChange}
                        size="small"
                        required
                        sx={{ mb: 2 }}
                      />
                      {/* Department Description */}
                      {/* <TextField
                        label="Description"
                        name="description"
                        value={departmentData.description}
                        onChange={handleChange}
                        size="small"
                        multiline
                        required
                        minRows={4}
                      /> */}
                      <Typography variant="body2" gutterBottom>
                        Description
                      </Typography>
                      <div
                        className="quillContainer"
                        ref={departmentQuillRef}
                      />
                      <br />
                      <div
                        className="quillContainer"
                        ref={departmentQuillRef_AR}
                      />
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
              <Grid>
                <Card>
                  <CardContent>
                    <FormGroup>
                      <Typography variant="subtitle1" sx={{ mb: 3 }}>
                        Cover Image for Department
                      </Typography>
                      {coverImageFile ? (
                        <img
                          src={departmentCoverImageUrl}
                          alt="CoverImage"
                          width="450"
                          style={{ margin: "1rem 0" }}
                        />
                      ) : (
                        <img
                          src={departmentData.coverImage}
                          alt="CoverImage"
                          width="450"
                          style={{ margin: "1rem 0" }}
                        />
                      )}

                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept=".jpg, .png, .jpeg"
                            type="file"
                            onChange={handleDepartmentCoverImage}
                          />
                        </Button>
                      </Stack>
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
              <Grid>
                <Card>
                  <CardContent>
                    <FormGroup>
                      <Typography variant="subtitle1" sx={{ mb: 3 }}>
                        SVG Icon Department
                      </Typography>
                      {svgImageFile ? (
                        <ReactSVG
                          src={departmentSVGIconUrl}
                          style={{ margin: "1rem 0", width: "15rem" }}
                        />
                      ) : (
                        <ReactSVG
                          src={departmentData.svgImage}
                          style={{ margin: "1rem 0", width: "15rem" }}
                        />
                      )}

                      <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept=".svg"
                            type="file"
                            onChange={handleDepartmentSVGIcon}
                          />
                          <PhotoCamera />
                        </IconButton>
                      </Stack>
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          <Grid xs={12} sm={12} md={3}>
            <Card>
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
                    Update
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
                  onClick={handleDepartmentDelete}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DepartmentEdit;
