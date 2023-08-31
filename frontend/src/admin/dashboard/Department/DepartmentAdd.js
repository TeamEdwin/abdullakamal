import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  FormGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { ReactSVG } from "react-svg";
import { useQuill } from "react-quilljs";

const DepartmentAdd = () => {
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
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
  const [loading, setLoading] = useState(false);

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

  // Handle Department Form Submit
  const handleSubmit = async (event) => {
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

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/department`;
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
        navigate(`/dashboard/department`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (departmentCoverImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(departmentCoverImageUrl);
      }
      if (departmentSVGIconUrl.startsWith("blob:")) {
        URL.revokeObjectURL(departmentSVGIconUrl);
      }
    };
  }, [departmentCoverImageUrl, departmentSVGIconUrl]);

  return (
    <>
      <h1>Add New Department</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={9}>
              {/* Description */}
              <Grid>
                <Card>
                  <CardContent>
                    <FormGroup>
                      {/* Department Title */}
                      <TextField
                        size="small"
                        sx={{ mb: 2 }}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title_en"
                        autoFocus
                      />
                      <TextField
                        size="small"
                        sx={{ mb: 2 }}
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title Arabic"
                        name="title_ar"
                        autoFocus
                      />
                      {/* Department Slug */}
                      <TextField
                        label="Slug"
                        name="slug"
                        size="small"
                        required
                        sx={{ mb: 2 }}
                      />
                      {/* Department Description */}
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
              {/* Cover Image for Department */}
              <Grid>
                <Card>
                  <CardContent>
                    <FormGroup>
                      <Typography variant="subtitle1">
                        Cover Image for Department
                      </Typography>
                      {departmentCoverImageUrl ? (
                        <img
                          src={departmentCoverImageUrl}
                          alt="CoverImage"
                          width="450"
                          style={{ marginTop: "1rem" }}
                        />
                      ) : (
                        <Skeleton
                          variant="rectangle"
                          width={450}
                          height={180}
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
                            name="coverImage"
                            onChange={handleDepartmentCoverImage}
                          />
                        </Button>
                      </Stack>
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
              {/* SVG Icon Department */}
              <Grid>
                <Card>
                  <CardContent>
                    <FormGroup>
                      <Typography variant="subtitle1">
                        SVG Icon Department
                      </Typography>
                      {departmentSVGIconUrl ? (
                        <ReactSVG
                          src={departmentSVGIconUrl}
                          style={{ marginTop: "1rem", width: "15rem" }}
                        />
                      ) : (
                        <Skeleton
                          variant="rectangle"
                          width={180}
                          height={200}
                          sx={{ mt: 1 }}
                        />
                      )}
                      <br />
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept=".svg"
                            type="file"
                            name="svgImage"
                            onChange={handleDepartmentSVGIcon}
                          />
                        </Button>
                      </Stack>
                    </FormGroup>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={3}>
              {/* Action Buttons */}
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
                      Add Department
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
      </div>
    </>
  );
};

export default DepartmentAdd;
