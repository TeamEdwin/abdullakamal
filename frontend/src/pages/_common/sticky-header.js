import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./sticky-header.scss";
import logo_h from "../../assets/AKMC-Logo-h.png";
import { useTranslation } from "react-i18next";

const AKMCStickyHeader = () => {
  const toggleRef = useRef();
  const closeNavigationRef = useRef();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

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
    // Header Navigation - Use default when header navigation is routed to new page
    window.document.body.style.overflowY = "scroll";

    // Show Sticky Header after reaching fixed header height on Scroll
    const listenToScroll = () => {
      let heightToShowFrom =
        window.document.getElementById("header").offsetHeight;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > heightToShowFrom) {
        setIsVisible(true);
      } else if (winScroll < heightToShowFrom) {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [isVisible]);

  return (
    <>
      <div className={`stickyHeader ${isVisible ? `act-scroll` : ""}`}>
        <div className="stickyHeader__container">
          <div className="stickyHeader__logo-box">
            <Link to="/">
              <div className="stickyHeader__logo-box--logo">
                <img
                  src={logo_h}
                  alt="Logo"
                  style={{ pointerEvents: "none" }}
                  className="stickyHeader__logo-box--logo-img"
                />
              </div>
            </Link>
            <div className="stickyHeader__logo-box--toggle">
              <Link to="#" className="btn-toggle" onClick={toggleSwitch}>
                &#9776;
              </Link>
            </div>
          </div>
          <div className="navigation" ref={toggleRef}>
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
          </div>
        </div>
      </div>
      <div
        className="akmc-close-nav"
        onClick={toggleSwitch}
        ref={closeNavigationRef}
      ></div>
    </>
  );
};

export default AKMCStickyHeader;
