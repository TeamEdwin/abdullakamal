import { Fragment, useEffect } from "react";
import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import AKMCFooter from "../_common/footer";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";

import "./index.scss";
import ImageDrAbullaKalam from "../../assets/drabdullakalam-1.jpg";
import AKMC_Logo from "../../assets/AKMC-Logo.png";
import ImageSeniorStaff from "../../assets/artworks/senior-staff-3.png";

import artworkPath73 from "../../assets/artworks/artwork-path-73.png";
import artworkPath3025 from "../../assets/artworks/artwork-path-3025.png";
import artworkPath3026 from "../../assets/artworks/artwork-path-3026.png";
import artworkGroup249 from "../../assets/artworks/artwork-group-249.png";
import artworkPath3177 from "../../assets/artworks/artwork-path-3177.png";
import artworkGroup497 from "../../assets/artworks/artwork-group-497.png";
import artworkGroup498 from "../../assets/artworks/artwork-group-498.png";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();

  const { data: aboutUsPageData, error: aboutUsPageError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/aboutUs`
  );

  useEffect(() => {
    if (aboutUsPageError) {
      navigate("/error", { replace: true });
    }

    document.title = "About Us - Dr. Abdulla Kamal Medical Centre";
  }, [aboutUsPageData, aboutUsPageError]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div>
        {/* About */}
        {aboutUsPageData ? (
          aboutUsPageData.data[0] && (
            <Fragment>
              <section className="aboutus" id="about-us">
                <div className="aboutus-art__container">
                  <img
                    src={artworkPath73}
                    alt="Artwork 1"
                    className="aboutus-art__container--art1"
                    style={{ pointerEvents: "none" }}
                  />
                  <img
                    src={artworkPath3025}
                    alt="Artwork 2"
                    className="aboutus-art__container--art2"
                    style={{ pointerEvents: "none" }}
                  />
                  <img
                    src={artworkPath3026}
                    alt="Artwork 3"
                    className="aboutus-art__container--art3"
                    style={{ pointerEvents: "none" }}
                  />
                  <img
                    src={artworkGroup249}
                    alt="Artwork 4"
                    className="aboutus-art__container--art4"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
                <div className="container aboutus__container text-justify text-purple">
                  <h1 className="h1 text-purple">{t("about.aboutUs.title")}</h1>
                  {/* <p>{data[0].content_1}</p> <br /> */}
                  <img
                    className="aboutus__container--img"
                    src={ImageDrAbullaKalam}
                    alt="Dr. Abulla Kalam"
                  />
                  <p className="aboutus__container--text">
                    {currentLanguage === "en"
                      ? aboutUsPageData.data[0]["en-US"].aboutUs
                      : aboutUsPageData.data[0]["ar-BH"].aboutUs}
                  </p>
                  {/* <p>{data[0].content_3}</p> */}
                </div>
              </section>

              {/* Message From Founder */}
              <section className="msg-founder" id="message-from-founder">
                <div className="container msg-founder__container text-justify text-purple">
                  <h1 className="h2">{t("about.messageFromFounder.title")}</h1>
                  <img
                    className="msg-founder__container--img"
                    src={ImageDrAbullaKalam}
                    alt="Dr. Abulla Kalam"
                  />
                  <p>
                    {currentLanguage === "en"
                      ? aboutUsPageData.data[0]["en-US"].messageFromFounder
                      : aboutUsPageData.data[0]["ar-BH"].messageFromFounder}
                  </p>
                  <img
                    className="msg-founder__container--akmclogo"
                    src={AKMC_Logo}
                    alt="AKMC Logo"
                  />
                </div>
              </section>

              {/* Hero Important Points */}
              <section className="impt-points">
                <div className="impt-points__container">
                  <div className="impt-points__container--left"></div>
                  <div className="impt-points__container--right">
                    <p>
                      {currentLanguage === "en"
                        ? aboutUsPageData.data[0]["en-US"].featurePoints
                        : aboutUsPageData.data[0]["ar-BH"].featurePoints}
                    </p>
                  </div>
                </div>
              </section>

              {/* Quote */}
              <blockquote className="quote">
                <div className="container quote__container text-purple">
                  <h3 className="h3">
                    <span className="quote__container--ldquo">&ldquo;</span>
                    {currentLanguage === "en"
                      ? aboutUsPageData.data[0]["en-US"].quote
                      : aboutUsPageData.data[0]["ar-BH"].quote}
                    <span className="quote__container--rdquo">&rdquo;</span>
                  </h3>
                </div>
              </blockquote>

              {/* Message from AKMC */}
              <section className="msg-akmc">
                <div className="msg-akmc-art__container">
                  <img
                    src={artworkPath3177}
                    alt="Artwork 5"
                    className="msg-akmc-art__container--art1"
                    style={{ pointerEvents: "none" }}
                  />
                  <img
                    src={artworkGroup497}
                    alt="Artwork 6"
                    className="msg-akmc-art__container--art2"
                    style={{ pointerEvents: "none" }}
                  />
                  <img
                    src={artworkGroup498}
                    alt="Artwork 7"
                    className="msg-akmc-art__container--art3"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
                <div className="container msg-akmc__container text-purple">
                  <div className="msg-akmc__container--text">
                    <h1 className="h2">{t("about.messageFromAKMC.title")}</h1>
                    <p>
                      {currentLanguage === "en"
                        ? aboutUsPageData.data[0]["en-US"].messageFromAKMC
                        : aboutUsPageData.data[0]["ar-BH"].messageFromAKMC}
                    </p>
                  </div>
                  <div className="msg-akmc__container--image">
                    <img
                      className="image"
                      src={ImageSeniorStaff}
                      alt="Senior Staff"
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
                </div>
              </section>

              {/* Vision Mission */}
              <section className="vm" id="vision-mission">
                <div className="container vm__container text-white">
                  <div className="vm__container--vision">
                    <h2 className="h2">{t("about.vision.title")}</h2>
                    <p>
                      {currentLanguage === "en"
                        ? aboutUsPageData.data[0]["en-US"].vision
                        : aboutUsPageData.data[0]["ar-BH"].vision}
                    </p>
                  </div>
                  <div className="vm__container--mission">
                    <h2 className="h2">{t("about.mission.title")}</h2>
                    <p>
                      {currentLanguage === "en"
                        ? aboutUsPageData.data[0]["en-US"].mission
                        : aboutUsPageData.data[0]["ar-BH"].mission}
                    </p>
                  </div>
                </div>
              </section>

              {/* Values */}
              <section className="values" id="values">
                <div className="container text-purple">
                  <h1 className="h2">{t("about.values.title")}</h1>
                  <p>
                    {currentLanguage === "en"
                      ? aboutUsPageData.data[0]["en-US"].values
                      : aboutUsPageData.data[0]["ar-BH"].values}
                  </p>
                </div>
              </section>

              {/* GOALS */}
              <section className="goals">
                <div className="goals__container text-white ltr-text">
                  <div className="goals__container--left"></div>
                  <div className="goals__container--right">
                    <h2 className="h2 rtl-text">{t("about.goals.title")}</h2>
                    {aboutUsPageData.goals.map((item) => (
                      <Fragment key={item._id}>
                        <h3 className="h3 rtl-text">
                          {currentLanguage === "en"
                            ? item["en-US"].goalTitle
                            : item["ar-BH"].goalTitle}
                        </h3>
                        <p className="rtl-text">
                          {currentLanguage === "en"
                            ? item["en-US"].goalDescription
                            : item["ar-BH"].goalDescription}
                        </p>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </section>

              {/* Patients' Rights */}
              <section className="rights">
                <div className="container rights__container text-purple">
                  {aboutUsPageData.patientRights.map((d, i) => (
                    <div className="rights__container--text" key={i}>
                      <h3 className="rights__container--text-title h3">
                        {currentLanguage === "en"
                          ? d["en-US"].patientsRightsTitle
                          : d["ar-BH"].patientsRightsTitle}
                      </h3>
                      <p className="rights__container--text-desc">
                        {currentLanguage === "en"
                          ? d["en-US"].patientsRightsDescription
                          : d["ar-BH"].patientsRightsDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Fragment>
          )
        ) : (
          <PageLoader />
        )}
      </div>
      <AKMCFooter />
    </>
  );
};

const PageLoader = () => {
  return (
    <div className="pageLoaderContainer">
      <div className="pageLoader"></div>
    </div>
  );
};

export default AboutUs;
