import { useParams, useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import Axios from "axios";
import {
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
import Grid from "@mui/material/Unstable_Grid2";

import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

export const PostEdit = () => {
  const { quill: BlogPostQuill, quillRef: BlogPostQuillRef } = useQuill();
  const { quill: BlogPostQuill_AR, quillRef: BlogPostQuillRef_AR } = useQuill();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState();
  const [postData, setPostData] = useState();
  const [loading, setLoading] = useState(false);

  // Blog Post Cover Image Preview
  const [profileImageFile, setProfileImageFile] = useState();
  const [profileData, setProfileData] = useState({ imageUrl: "" });
  const handleProfileImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const profileImageUrl = URL.createObjectURL(file);
      setProfileData({ imageUrl: profileImageUrl });
      setProfileImageFile(event.target.files[0]);
    }
  };

  // READ Categories All
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

  // READ Post by ID
  const getPostById = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/stories/${blogId}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setPostData(res.data);
        if (BlogPostQuill) {
          BlogPostQuill.clipboard.dangerouslyPasteHTML(res.data["en-US"].body);
        }
        if (BlogPostQuill_AR) {
          BlogPostQuill_AR.clipboard.dangerouslyPasteHTML(res.data["ar-BH"].body);
        }
      })
      .catch((err) => console.log(err));
  };

  // UPDATE Blog Post Submission
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const valuedata = {
      "en-US": {
        title: data.get("PostTitle"),
        body: BlogPostQuill.root.innerHTML,
      },
      "ar-BH": {
        title: data.get("PostTitle_ar"),
        body: BlogPostQuill_AR.root.innerHTML,
      },
      category: data.get("category"),
      file: profileImageFile,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/stories/${blogId}`;
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
        navigate(`/dashboard/blog`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // DELETE Blog Post
  const handleDeletePost = async (blogId) => {
    let text = "Are you sure, Want to Delete the Post?";
    if (window.confirm(text) === true) {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/stories/${blogId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          setLoading(false);
          navigate(`/dashboard/blog`);
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          setLoading(false);
          console.log("Post Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getCategories();
    getPostById();
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (profileData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profileData.imageUrl);
      }
    };
  }, [profileData.imageUrl, BlogPostQuill, BlogPostQuill_AR]);

  return (
    <>
      <h1>Edit Post</h1>
      <div className="quill">
        <form onSubmit={handleUpdateSubmit}>
          {postData && (
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
                        defaultValue={postData["en-US"].title}
                      />
                      {/* Post Title */}
                      <TextField
                        name="PostTitle_ar"
                        className="quill__titleInput"
                        label="Your Post Title - Arabic"
                        defaultValue={postData["ar-BH"].title}
                      />
                      {/* Content of the Post */}
                      <div
                        ref={BlogPostQuillRef}
                        className="quill__container"
                        style={{ marginBottom: "2rem" }}
                      />
                      {/* Content of the Post - Arabic*/}
                      <div
                        ref={BlogPostQuillRef_AR}
                        className="quill__container"
                      />
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={12} md={3}>
                {/* Cover Image */}
                <Card sx={{ mb: 2 }}>
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
                      ) : (
                        <img
                          src={postData.imageUrl}
                          style={{
                            marginBottom: "1rem",
                            width: "23rem",
                          }}
                        />
                      )}
                      <Button variant="contained" component="label">
                        Upload
                        <input
                          hidden
                          accept=".jpg, .png, .jpeg"
                          type="file"
                          onChange={handleProfileImageUpload}
                        />
                      </Button>
                    </FormGroup>
                  </CardContent>
                </Card>
                {/* Post Category */}
                <Card sx={{ mb: 2 }}>
                  <CardHeader subheader="Categores" />
                  <CardContent>
                    <FormGroup>
                      {postData.category ? (
                        <TextField
                          fullWidth
                          label="Select Category"
                          name="category"
                          required
                          select
                          SelectProps={{ native: true }}
                          variant="outlined"
                          defaultValue={postData.category._id}
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
                      ) : (
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
                            Uncategorized
                          </option>
                          {categoriesData &&
                            categoriesData.map((item) => (
                              <option value={item._id} key={item._id}>
                                {item.title}
                              </option>
                            ))}
                        </TextField>
                      )}
                    </FormGroup>
                  </CardContent>
                </Card>
                {/* Action Buttons */}
                <Card>
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
                        Update
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
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeletePost(blogId)}
                      disableElevation
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </>
  );
};

export default PostEdit;
