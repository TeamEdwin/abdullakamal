import { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  FormGroup,
  TextField,
  Typography,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { ReactComponent as TikTokIcon } from "../../../assets/icons/tiktok.svg";

const ContactUs = () => {
  const [contactDetailsPageData, setContactDetailsPageData] = useState();

  const getContactDetailsData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/contact`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setContactDetailsPageData(res.data.data[0]);
        console.log(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleContactDetailsSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const contactDetailsValues = {
      "en-US": {
        description: data.get("description"),
        address: data.get("address"),
      },
      "ar-BH": {
        description: data.get("description_ar"),
        address: data.get("address_ar"),
      },
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
      secondaryPhoneNumber: data.get("secondaryPhoneNumber"),
      thirdPhoneNumber: data.get("thirdPhoneNumber"),
      fourthPhoneNumber: data.get("fourthPhoneNumber"),
      fifthPhoneNumber: data.get("fifthPhoneNumber"),
      sixthPhoneNumber: data.get("sixthPhoneNumber"),
      faceBook: data.get("facebook"),
      instagram: data.get("instagram"),
      linkedIn: data.get("linkedIn"),
      youtube: data.get("youtube"),
      tiktok: data.get("tiktok"),
      otherInstagram01: data.get("otherInstagram01"),
      otherInstagram02: data.get("otherInstagram02"),
      // twitter: data.get("twitter"),
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/contact`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: contactDetailsValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("Contact Us Added!", res);
        // event.target.reset();
        getContactDetailsData();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getContactDetailsData();
  }, []);

  return (
    <>
      <h1>Contact Us Page</h1>
      <form onSubmit={handleContactDetailsSubmit}>
        <Grid2 container spacing={2} sx={{ mt: 2, mb: 10 }}>
          <Grid2 xs={12} sm={12} md={9}>
            <Card>
              <CardContent>
                <FormGroup>
                  <Typography variant="h5">Get In Touch</Typography>
                  <TextField
                    label="Description"
                    name="description"
                    multiline
                    size="small"
                    rows={5}
                    helperText="Use \n for new line and \t for tab space"
                    sx={{ mt: 2 }}
                    defaultValue={
                      contactDetailsPageData
                        ? contactDetailsPageData["en-US"].description
                        : null
                    }
                  />
                  <TextField
                    label="Description - Arabic"
                    name="description_ar"
                    multiline
                    size="small"
                    rows={5}
                    helperText="Use \n for new line and \t for tab space"
                    sx={{ mt: 2 }}
                    defaultValue={
                      contactDetailsPageData
                        ? contactDetailsPageData["ar-BH"].description
                        : null
                    }
                  />
                  <Divider sx={{ mt: 5, mb: 2 }} />
                  {contactDetailsPageData && (
                    <Fragment>
                      <Typography variant="h5">Contact Details</Typography>
                      <Grid container spacing={1}>
                        {/* Location Address */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            name="address"
                            label="Address"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData["en-US"].address
                                : null
                            }
                          />
                        </Grid>

                        {/* Location Address - Arabic */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            name="address_ar"
                            label="Address - Arabic"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData["ar-BH"].address
                                : null
                            }
                          />
                        </Grid>

                        {/* Email Address */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Email"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.email
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Primary Mobile */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Primary Mobile Number"
                            name="phoneNumber"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.phoneNumber
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Secondary Mobile */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            name="secondaryPhoneNumber"
                            label="Secondary Mobile Number | WhatsApp"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.secondaryPhoneNumber
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WhatsAppIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Third Mobile */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            name="thirdPhoneNumber"
                            label="Third Mobile Number"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.thirdPhoneNumber
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Fourth Mobile */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            name="fourthPhoneNumber"
                            label="Fourth Mobile Number"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.fourthPhoneNumber
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Fifth Mobile */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            name="fifthPhoneNumber"
                            label="Fifth Mobile Number"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.fifthPhoneNumber
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Sixth Mobile */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            name="sixthPhoneNumber"
                            label="Sixth Mobile Number"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.sixthPhoneNumber
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Facebook */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="Facebook"
                            name="facebook"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.faceBook
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FacebookIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* Instagram */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="Instagram"
                            name="instagram"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.instagram
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <InstagramIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* LinkedIn */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="LinkedIn"
                            name="linkedIn"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.linkedIn
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LinkedInIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* YouTube */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="YouTube"
                            name="youtube"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.youtube
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <YouTubeIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>

                        {/* TitTok */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="TikTok"
                            name="tiktok"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.tiktok
                                : null
                            }
                          />
                        </Grid>
                      </Grid>

                      <Divider sx={{ mt: 5, mb: 2 }} />
                      <Typography variant="h5">Other Contacts</Typography>
                      <Grid container spacing={1}>
                        {/* Other Instagram 01 */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="Instagram 01"
                            name="otherInstagram01"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.otherInstagram01
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <InstagramIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        {/* Other Instagram 01 */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            type="text"
                            label="Instagram 02"
                            name="otherInstagram02"
                            required
                            variant="outlined"
                            sx={{ mt: 2 }}
                            defaultValue={
                              contactDetailsPageData
                                ? contactDetailsPageData.otherInstagram02
                                : null
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <InstagramIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Fragment>
                  )}
                </FormGroup>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 xs={12} sm={12} md={3}>
            <Card>
              <CardHeader subheader="Actions" />
              <CardContent></CardContent>
              <CardActions>
                <Button type="submit" variant="contained" disableElevation>
                  Update Page
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default ContactUs;
