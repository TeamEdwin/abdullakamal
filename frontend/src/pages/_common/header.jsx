import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import logo from "../../assets/akmc-logo-vertical.png";
import logo_h from "../../assets/akmc-logo-horizontal.png";
import ar_logo from "../../assets/ar.jpg";
import { ReactComponent as FlagBH } from "../../assets/icons/bh.svg";
import { ReactComponent as FlagUS } from "../../assets/icons/us.svg";
import { ReactComponent as TikTokIcon } from "../../assets/icons/tiktok.svg";
import "./header.scss";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

import { useTranslation } from "react-i18next";
import i18n from "../../helpers/i18n";

const AKMCHeader = () => {
  const { t } = useTranslation();
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();

  const { data: contactUsData, error: contactUsError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/contact`
  );

  const { pathname, hash, key } = useLocation();
  const toggleRef = useRef();
  const closeNavigationRef = useRef();

  // Mobile Header Navigation Toggle (Open & Close)
  const toggleSwitch = () => {
    // When Mobile Navigation is hidden
    if (toggleRef.current.style.display === "") {
      toggleRef.current.style.display = "block";
      window.document.body.style.overflowY = "hidden";
      closeNavigationRef.current.style.opacity = 1;
      closeNavigationRef.current.style.visibility = "visible";

      // When Mobile Navigation is hidden
    } else if (toggleRef.current.style.display === "none") {
      toggleRef.current.style.display = "block";
      window.document.body.style.overflowY = "hidden";
      closeNavigationRef.current.style.opacity = 1;
      closeNavigationRef.current.style.visibility = "visible";

      // When Mobile Navigation is Visible
    } else if (toggleRef.current.style.display === "block") {
      toggleRef.current.style.display = "";
      window.document.body.style.overflowY = "scroll";
      closeNavigationRef.current.style.opacity = 0;
      closeNavigationRef.current.style.visibility = "hidden";
    }
  };

  useEffect(() => {
    // WHEN USING HEADER DROPDOWN - GETTING ERROR WITH STICKY HEADER
    // Scroll to specific section of the page (Navigation link drop)
    // if not a hash link, scroll to top
    // if (hash === "") {
    //   window.scrollTo(0, 0);
    // }
    // // else scroll to id
    // else {
    //   setTimeout(() => {
    //     const id = hash.replace("#", "");
    //     const element = document.getElementById(id);
    //     if (element) {
    //       element.scrollIntoView(true);
    //     }
    //     var scrolledY = window.scrollY;
    //     if (scrolledY) {
    //       window.scroll(0, scrolledY - 70);
    //     }
    //   }, 0);
    // }
    // Header Navigation - Use default when header navigation is routed to new page
    // window.document.body.style.overflowY = "scroll";
    if (currentLanguageCode === "en") {
      document.body.dir = "ltr";
    } else if (currentLanguageCode === "ar") {
      document.body.dir = "rtl";
    }

    if (contactUsError) {
      navigate("/error", { replace: true });
    }
  }, [pathname, hash, key, contactUsData, contactUsError, currentLanguageCode]);

  // Language English Button
  const englishSwitchButton = (
    <span className="akmcHeaderDetails__lang-btn">
      <button
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >
        English
      </button>
    </span>
  );

  // Language Arabic Button
  const arabicSwitchButton = (
    <span className="akmcHeaderDetails__lang-btn">
      <button
        onClick={() => {
          i18n.changeLanguage("ar");
        }}
      >
        العربية
      </button>
    </span>
  );

  return (
    <>
      <header className="header" id="header">
        <div className="akmcHeaderDetails">
          {contactUsData && contactUsData.data[0] && (
            <div className="header__container">
              <span>
                <span className="akmcHeaderDetails__address">
                  <span className="akmcHeaderDetails__content">
                    <a
                      href="https://goo.gl/maps/WVs2FtEJr2bk2JYm6"
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{ color: "#fff", textDecoration: "none" }}
                    >
                      {currentLanguage === "en"
                        ? contactUsData.data[0]["en-US"].address
                        : contactUsData.data[0]["ar-BH"].address}
                    </a>
                  </span>
                </span>
                <span>
                  <a
                    href={contactUsData.data[0].instagram}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    <InstagramIcon
                      className="akmcHeaderDetails__icon"
                      sx={{ fontSize: 20 }}
                    />
                  </a>
                  <a
                    href={contactUsData.data[0].faceBook}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    <FacebookIcon
                      className="akmcHeaderDetails__icon"
                      sx={{ fontSize: 20 }}
                    />
                  </a>
                  <a
                    href={contactUsData.data[0].youtube}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    <YouTubeIcon
                      className="akmcHeaderDetails__icon"
                      sx={{ fontSize: 20 }}
                    />
                  </a>
                  <a
                    href={contactUsData.data[0].linkedIn}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    <LinkedInIcon
                      className="akmcHeaderDetails__icon"
                      sx={{ fontSize: 20 }}
                    />
                  </a>
                  <a
                    href={contactUsData.data[0].tiktok}
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ color: "#fff" }}
                  >
                    <TikTokIcon
                      style={{
                        height: "16px",
                        marginLeft: "0.3rem",
                        marginBottom: "2px",
                        fill: "#fff",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </span>
              </span>
              <span className="akmcHeaderDetails__phone">
                {/* <span> */}
                  <span
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <span className="akmcHeaderDetails__phone-1">
                      <LocalPhoneIcon
                        className="akmcHeaderDetails__icon"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="akmcHeaderDetails__content ltr-text">
                        <a
                          href={`tel:+${contactUsData.data[0].phoneNumber}`}
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          {contactUsData.data[0].phoneNumber}
                        </a>
                      </span>
                    </span>
                    <span className="akmcHeaderDetails__phone-2">
                      <WhatsAppIcon
                        className="akmcHeaderDetails__icon"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="akmcHeaderDetails__content ltr-text">
                        <a
                          href={`https://wa.me/${
                            contactUsData.data[0].secondaryPhoneNumber
                              ? contactUsData.data[0].secondaryPhoneNumber.replace(
                                  /[^\w]/g,
                                  ""
                                )
                              : null
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          {contactUsData.data[0].secondaryPhoneNumber}
                        </a>
                      </span>
                    </span>
                    <span className="akmcHeaderDetails__phone-3">
                      <LocalPhoneIcon
                        className="akmcHeaderDetails__icon"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="akmcHeaderDetails__content ltr-text">
                        <a
                          href={`tel:${contactUsData.data[0].thirdPhoneNumber}`}
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          {contactUsData.data[0].thirdPhoneNumber}
                        </a>
                      </span>
                    </span>
                  </span>
                  {/* Addition Phone Numbers */}
                  {/* <span
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <span className="akmcHeaderDetails__phone-1">
                      <LocalPhoneIcon
                        className="akmcHeaderDetails__icon"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="akmcHeaderDetails__content ltr-text">
                        <a
                          href={`tel:+${contactUsData.data[0].fourthPhoneNumber}`}
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          {contactUsData.data[0].fourthPhoneNumber}
                        </a>
                      </span>
                    </span>
                    <span className="akmcHeaderDetails__phone-2">
                      <LocalPhoneIcon
                        className="akmcHeaderDetails__icon"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="akmcHeaderDetails__content ltr-text">
                        <a
                          href={`tel:+${contactUsData.data[0].fifthPhoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          {contactUsData.data[0].fifthPhoneNumber}
                        </a>
                      </span>
                    </span>
                    <span className="akmcHeaderDetails__phone-3">
                      <LocalPhoneIcon
                        className="akmcHeaderDetails__icon"
                        sx={{ fontSize: 20 }}
                      />
                      <span className="akmcHeaderDetails__content ltr-text">
                        <a
                          href={`tel:${contactUsData.data[0].sixthPhoneNumber}`}
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                          }}
                        >
                          {contactUsData.data[0].sixthPhoneNumber}
                        </a>
                      </span>
                    </span>
                  </span> */}
                {/* Arabic Language Switcher  */}
                {i18n.resolvedLanguage === "ar"
                  ? englishSwitchButton
                  : arabicSwitchButton}
                </span>
              {/* </span> */}
            </div>
          )}
        </div>
        <div className="header__container">
          <div className="header__logo-box">
            <Link to="/">
              <div className="header__logo-box--logo">
                <picture style={{ height: "9rem" }}>
                  <source srcSet={logo_h} media="(max-width: 56.25em)" />
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ pointerEvents: "none" }}
                    className="header__logo-box--logo-img"
                  />
                </picture>
              </div>
            </Link>
            <div className="header__logo-box--toggle">
              <Link to="#" className="btn-toggle" onClick={toggleSwitch}>
                &#9776;
              </Link>
            </div>
          </div>
          <nav className={`navigation`} ref={toggleRef}>
            <ul className="navigation__list">
              <li className="navigation__item">
                <Link to="/" className="navigation__link">
                  {t("header.label_home")}
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/about-us" className="navigation__link">
                  {t("header.label_aboutUs")}
                </Link>
                {/* <div className="dropdown-content">
                  <Link to="/about-us#message-from-founder">
                    Message from the Founder
                  </Link>
                  <Link to="/about-us#vision-mission">Vision & Mission</Link>
                  <Link to="/about-us#values">Values</Link>
                </div> */}
              </li>
              <li className="navigation__item">
                <Link to="/departments" className="navigation__link">
                  {t("header.label_ourDepartments")}
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/doctors" className="navigation__link">
                  {t("header.label_ourDoctors")}
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/insurance-providers" className="navigation__link">
                  {t("header.label_insuranceProviders")}
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/packages" className="navigation__link">
                  {t("header.label_packages")}
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/contact-us" className="navigation__link">
                  {t("header.label_contactUs")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div
        className="akmc-close-nav"
        onClick={toggleSwitch}
        ref={closeNavigationRef}
      ></div>
    </>
  );
};

export default AKMCHeader;
