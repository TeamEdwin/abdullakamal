import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";

import "./index.scss";
import useSWR from "swr";
import { isAuth } from "../../../context/helpers";

const Profile = () => {
  const [profileImageFile, setProfileImageFile] = useState();
  const loggedInUserId = JSON.parse(localStorage.getItem("user")).id;
  const [profileDB, setProfileDB] = useState();
  const [loading, setLoading] = useState(false);

  // READ PROFILE DATA
  const getProfileData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/${loggedInUserId}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setProfileDB(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UPDATE PROFILE DATA
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    // setLoading(true);
    const data = new FormData(event.currentTarget);
    var passwordInputData;
    if (data.get("password") === "" || !data.get("password")) {
      passwordInputData = undefined;
    } else {
      passwordInputData = data.get("password");
    }

    const profileValues = {
      name: data.get("name"),
      phoneNumber: data.get("phone"),
      image: profileImageFile,
      password: passwordInputData,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/profile/${loggedInUserId}`;
    const options = {
      method: "PUT",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: profileValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        getProfileData();
        console.log("Updated!");
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
    getProfileData();
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (profileData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profileData.imageUrl);
      }
    };
  }, [profileData.imageUrl]);

  const chipRenderForRole = () => {
    if (profileDB.role === "admin") {
      return (
        <Chip
          label="Admin"
          color="error"
          sx={{
            mt: "0.2rem",
            mr: "1rem",
            fontSize: "1.6rem",
          }}
        />
      );
    } else if (profileDB.role === "maintainer") {
      return (
        <Chip
          label="Maintainer"
          color="warning"
          sx={{
            mt: "0.2rem",
            mr: "1rem",
            fontSize: "1.6rem",
          }}
        />
      );
    } else {
      return (
        <Chip
          label="User"
          color="info"
          sx={{
            mt: "0.2rem",
            mr: "1rem",
            fontSize: "1.6rem",
          }}
        />
      );
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {profileDB && (
              <Grid item lg={8} md={6} xs={12}>
                <form
                  onSubmit={handleUpdateProfile}
                  autoComplete="off"
                  noValidate
                >
                  <Card>
                    <CardHeader
                      title="Profile Update"
                      action={chipRenderForRole()}
                    />
                    <Divider />
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          mb: "2rem",
                        }}
                      >
                        {profileImageFile ? (
                          <Avatar
                            src={profileData.imageUrl}
                            sx={{
                              height: 120,
                              mb: 1,
                              width: 120,
                            }}
                          />
                        ) : (
                          <Avatar
                            src={profileDB.image}
                            sx={{
                              height: 120,
                              mb: 1,
                              width: 120,
                            }}
                          />
                        )}

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
                            onChange={handleProfileImageUpload}
                          />
                        </Button>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="email"
                            label="Email Address"
                            name="email"
                            required
                            variant="outlined"
                            defaultValue={profileDB.email}
                            disabled
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            helperText="Please specify the Full name"
                            label="Full name"
                            name="name"
                            required
                            variant="outlined"
                            defaultValue={profileDB.name}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            variant="outlined"
                            defaultValue={profileDB.phoneNumber}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={loading}
                          variant="contained"
                        >
                          Update details
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-1.6rem",
                              marginLeft: "-1.2rem",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Card>
                </form>
              </Grid>
            )}

            <Grid item lg={4} md={6} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
