import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Typography,
  CircularProgress,
} from "@mui/material";

const UserEdit = () => {
  const navigate = useNavigate();
  const [userImageFile, setUserImageFile] = useState();
  const userID = useParams().userId;
  const [userDB, setUserDB] = useState();
  const [loading, setLoading] = useState(false);

  // READ selected User
  const getUser = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/${userID}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setUserDB(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UPDATE User
  const updateUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    var phoneInputData;
    if (data.get("phone") === "" || !data.get("phone")) {
      phoneInputData = undefined;
    } else {
      phoneInputData = data.get("phone");
    }

    const valuedata = {
      name: data.get("name"),
      phoneNumber: phoneInputData,
      role: data.get("role"),
      image: userImageFile,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/profile/${userID}`;
    const options = {
      method: "PUT",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: valuedata,
    };
    console.log(valuedata);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/users`);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // DELETE User
  const handleDeleteUser = async () => {
    let text = "Are you sure, Want to Delete the User?";
    if (window.confirm(text) === true) {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/profile/${userID}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          setLoading(false);
          navigate(`/dashboard/users`);
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          setLoading(false);
          console.log("User Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  // User Image Preview
  const [userData, setUserData] = useState({ imageUrl: "" });
  const handleUserImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const userImageUrl = URL.createObjectURL(file);
      setUserData({ imageUrl: userImageUrl });
      setUserImageFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    getUser();
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (userData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(userData.imageUrl);
      }
    };
  }, [userData.imageUrl]);

  const chipRenderForRole = () => {
    if (userDB.role === "admin") {
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
    } else if (userDB.role === "maintainer") {
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
      <h1>User</h1>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {userDB && (
              <Grid item lg={8} md={6} xs={12}>
                <form onSubmit={updateUser} autoComplete="off" noValidate>
                  <Card>
                    <CardHeader
                      title={userDB.email}
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
                        {userImageFile ? (
                          <Avatar
                            src={userData.imageUrl}
                            sx={{
                              height: 120,
                              mb: 1,
                              width: 120,
                            }}
                          />
                        ) : (
                          <Avatar
                            src={userDB.image}
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
                            onChange={handleUserImageUpload}
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
                            defaultValue={userDB.email}
                            disabled
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            helperText="Please specify the full name"
                            label="Full name"
                            name="name"
                            required
                            variant="outlined"
                            defaultValue={userDB.name}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            variant="outlined"
                            defaultValue={userDB.phoneNumber}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            required
                            select
                            SelectProps={{ native: true }}
                            variant="outlined"
                            defaultValue={userDB.role}
                          >
                            <option value="defaultSelected" disabled>
                              Select Role
                            </option>
                            <option value="admin">Admin</option>
                            {/* <option value="maintainer">Maintainer</option> */}
                            <option value="user">User</option>
                          </TextField>
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
                          variant="contained"
                          disabled={loading}
                        >
                          Update User
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

export default UserEdit;
