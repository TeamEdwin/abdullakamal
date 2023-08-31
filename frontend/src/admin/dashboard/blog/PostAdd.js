import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useQuill } from "react-quilljs";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";

import "quill/dist/quill.snow.css";

const PostAll = () => {
  const navigate = useNavigate();
  const { quill: postQuill, quillRef: postQuillRef } = useQuill({
    placeholder: "Post Body - English",
  });
  const { quill: postQuill_AR, quillRef: postQuillRef_AR } = useQuill({
    placeholder: "Post Body - Arabic",
  });
  const [profileImageFile, setProfileImageFile] = useState();
  const [categoriesData, setCategoriesData] = useState();
  const [loading, setLoading] = useState(false);

  // READ All Categories
  const getCategories = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/categories`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setCategoriesData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // CREATE Post Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const valuedata = {
      "en-US": {
        title: data.get("PostTitle"),
        body: postQuill.root.innerHTML,
      },
      "ar-BH": {
        title: data.get("PostTitle_ar"),
        body: postQuill_AR.root.innerHTML,
      },
      category: data.get("category"),
      file: profileImageFile,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/stories`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: valuedata,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/blog`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Profile Image Preview
  const [profileData, setProfileData] = useState({ imageUrl: "" });
  const handleProfileImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const profileImageUrl = URL.createObjectURL(file);
      setProfileData({ imageUrl: profileImageUrl });
      setProfileImageFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    getCategories();

    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (profileData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profileData.imageUrl);
      }
    };
  }, [profileData.imageUrl]);

  return (
    <>
      <h1>Add Post</h1>
      <div className="quill">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={9}>
              <Card>
                <CardContent>
                  <FormControl fullWidth>
                    {/* Post Title */}
                    <TextField
                      name="PostTitle"
                      className="quill__titleInput"
                      label="Your Post Title"
                      required
                    />
                    <TextField
                      name="PostTitle_ar"
                      className="quill__titleInput"
                      label="Your Post Title - Arabic"
                      required
                    />
                    {/* Content of the Post */}
                    <div
                      ref={postQuillRef}
                      className="quill__container"
                      style={{ marginBottom: "2rem" }}
                    />
                    <div ref={postQuillRef_AR} className="quill__container" />
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={12} md={3}>
              {/* Cover Image */}
              <Card>
                <CardContent>
                  <FormGroup>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Cover Image Post
                    </Typography>
                    {profileImageFile ? (
                      <img
                        src={profileData.imageUrl}
                        style={{
                          marginBottom: "1rem",
                          width: "23rem",
                        }}
                      />
                    ) : null}
                    <Button variant="contained" component="label">
                      Upload
                      <input
                        hidden
                        accept=".jpg, .png, .jpeg"
                        type="file"
                        onChange={handleProfileImageUpload}
                        required
                      />
                    </Button>
                  </FormGroup>
                </CardContent>
              </Card>
              {/* Select Category */}
              <Card sx={{ mt: 2 }}>
                <CardHeader subheader="Categores" />
                <CardContent>
                  <FormGroup>
                    <TextField
                      fullWidth
                      label="Select Category"
                      name="category"
                      required
                      select
                      SelectProps={{ native: true }}
                      variant="outlined"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categoriesData &&
                        categoriesData.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item["en-US"].title} | {item["ar-BH"].title}
                          </option>
                        ))}
                    </TextField>
                  </FormGroup>
                </CardContent>
              </Card>
              {/* Action Buttons */}
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
                      Publish
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-1rem",
                          marginLeft: "-1.2rem",
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

export default PostAll;
