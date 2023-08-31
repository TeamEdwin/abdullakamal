import { useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import GoogleMaps from "./googlemap";
import { Button, IconButton, ThemeProvider } from "@mui/material";
import { Stack } from "@mui/system";
import theme from "../../styles/muiTheme";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ReactComponent as TikTokIcon } from "../../assets/icons/tiktok.svg";
import TwitterIcon from "@mui/icons-material/Twitter";

import "./footer.scss";
import { useTranslation } from "react-i18next";

const AKMCFooter = () => {
  const { t } = useTranslation();
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";

  const { data: contactUsData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/contact`
  );

  useEffect(() => {}, [contactUsData]);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container-1">
          <ul>
            <li>
              <Link to="/about-us">{t("footer.label_aboutUs")}</Link>
            </li>
            <li>
              <Link to="/departments">{t("footer.label_ourDepartments")}</Link>
            </li>
            <li>
              <Link to="/find-doctor">{t("footer.label_findADoctor")}</Link>
            </li>
            <li>
              <Link to="/packages">{t("footer.label_packagesAndOffer")}</Link>
            </li>
            <li>
              <Link to="/insurance-providers">
                {t("footer.label_insuranceProvider")}
              </Link>
            </li>
            <li>
              <Link to="/health-information">
                {t("footer.label_healthInformation")}
              </Link>
            </li>
            <li>
              <Link to="#">{t("footer.label_patientSymptoms")}</Link>
            </li>
          </ul>
        </div>
        <div className="footer__container-2">
          <ul>
            <li>
              <Link to="/news">{t("footer.label_news")}</Link>
            </li>
            <li>
              <Link to="/gallery">{t("footer.label_gallery")}</Link>
            </li>
            <li>
              <Link to="/adminlogin">{t("footer.label_admin")}</Link>
            </li>
            <li>
              <Link to="/contact-us">{t("footer.label_contactUs")}</Link>
            </li>
            <li>
              <Link to="#">{t("footer.label_patients")}</Link>
            </li>
            <li>
              <Link to="/privacy">{t("footer.label_privacy")}</Link>
            </li>
            <li>
              <Link to="/terms-conditions">
                {t("footer.label_termsConditions")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__container-3">
          <div className="footer__container-3--Map m-auto text-black">
            <GoogleMaps />
          </div>
          {contactUsData && contactUsData.data[0] && (
            <div className="footer__container-3--contact">
              <p className="footer__container-3--contact-address">
                {currentLanguageCode === "en"
                  ? contactUsData.data[0]["en-US"].address
                  : contactUsData.data[0]["ar-BH"].address}{" "}
                <br />
                <a
                  href={`mailto:${contactUsData.data[0].email}`}
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  {contactUsData.data[0].email}
                </a>
                &nbsp;|&nbsp;
                <a
                  href={`tel:${contactUsData.data[0].phoneNumber}`}
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  {`${contactUsData.data[0].phoneNumber}`}
                </a>
              </p>
              <div>
                <ThemeProvider theme={theme}>
                  <Stack
                    direction="row"
                    spacing={0}
                    sx={{ justifyContent: "center" }}
                  >
                    <IconButton
                      href={contactUsData.data[0].otherInstagram01}
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
                      href={contactUsData.data[0].otherInstagram02}
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
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="copyright">
        &copy; 2022 Copyright Dr. Abdulla Kamal Medical Centre. <br /> All Right
        Reserved.
      </div>
    </footer>
  );
};

export default AKMCFooter;
