import { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import useSWR from "swr";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
} from "@mui/material";
import theme from "../../styles/muiTheme";
import { Stack } from "@mui/system";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ReactComponent as TikTokIcon } from "../../assets/icons/tiktok.svg";
import TwitterIcon from "@mui/icons-material/Twitter";

import "./ContactUs.scss";

import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const [loading, setLoading] = useState(false);
  const [messageToggle, setMessageToggle] = useState(false);

  const { data: contactUsData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/contact`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const contactUsValues = {
      name: data.get("name"),
      mobile: data.get("mobile"),
      message: data.get("message"),
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/contact-us`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: contactUsValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        setMessageToggle(true);
        e.target.reset();
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {}, [contactUsData]);

  return (
    <div className="contactUs">
      <div className="contactUs__container container text-white">
        <div className="contactUs__container-left">
          <h1 className="h1">{t("contactUs.title")}</h1>
          {contactUsData && contactUsData.data[0] && (
            <Fragment>
              <p>
                {currentLanguage === "en"
                  ? contactUsData.data[0]["en-US"].description
                  : contactUsData.data[0]["ar-BH"].description}
              </p>

              <ThemeProvider theme={theme}>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <LocationCityIcon color="white" />
                    </ListItemIcon>
                    <ListItemText
                      className="contactUs-address"
                      primary={
                        currentLanguage === "en"
                          ? contactUsData.data[0]["en-US"].address
                          : contactUsData.data[0]["ar-BH"].address
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <EmailIcon color="white" />
                    </ListItemIcon>
                    <a
                      href={`mailto:${contactUsData.data[0].email}`}
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      <ListItemText primary={contactUsData.data[0].email} />
                    </a>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <LocalPhoneIcon color="white" />
                    </ListItemIcon>
                    <a
                      href={`tel:${contactUsData.data[0].phoneNumber}`}
                      rel="noopener noreferrer"
                      className="ltr-text"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      <ListItemText
                        primary={`${contactUsData.data[0].phoneNumber}`}
                      />
                    </a>
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <LocalPhoneIcon color="white" />
                    </ListItemIcon>
                    <a
                      href={`tel:${contactUsData.data[0].secondaryPhoneNumber}`}
                      rel="noopener noreferrer"
                      className="ltr-text"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}
                    >
                      <ListItemText
                        primary={`${contactUsData.data[0].secondaryPhoneNumber}`}
                      />
                    </a>
                  </ListItem>
                </List>
                <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                  <IconButton
                    href={contactUsData.data[0].instagram}
                    className="socialMediaIcons"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="white"
                    aria-label="Instagram"
                    size="large"
                    disableRipple
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    href={contactUsData.data[0].faceBook}
                    className="socialMediaIcons"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="white"
                    aria-label="Facebook"
                    size="large"
                    disableRipple
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    href={contactUsData.data[0].youtube}
                    className="socialMediaIcons"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="white"
                    aria-label="Facebook"
                    size="large"
                    disableRipple
                  >
                    <YouTubeIcon />
                  </IconButton>
                  <IconButton
                    href={contactUsData.data[0].linkedIn}
                    className="socialMediaIcons"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="white"
                    aria-label="LinkedIn"
                    size="large"
                    disableRipple
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <a
                    href={contactUsData.data[0].tiktok}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    <TikTokIcon
                      style={{
                        height: "20px",
                        marginLeft: "0.3rem",
                        marginTop: "13px",
                        fill: "#fff",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </Stack>
              </ThemeProvider>
            </Fragment>
          )}
        </div>
        <div className="contactUs__container-right ltr-text">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                <span className="label">
                  {t("contactUs.form.label_firstName")}
                </span>
                <br />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="akmc-input"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label">
                  {t("contactUs.form.label_mobileNumber")}
                </span>{" "}
                <br />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="akmc-input"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                <span className="label">
                  {t("contactUs.form.label_message")}
                </span>{" "}
                <br />
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Type your message here..."
                  className="akmc-input"
                  required
                ></textarea>
              </label>
            </div>
            <div>
              <input
                type="submit"
                value={t("contactUs.form.label_message")}
                className="btn-primary"
                disabled={loading}
              />
            </div>
          </form>
          {messageToggle && (
            <div className="message">
              <p>Thank you for the message. We'll get back to you soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
