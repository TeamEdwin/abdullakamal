import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import artworkPath73 from "../../assets/artworks/artwork-path-73.png";
import artworkPath3025 from "../../assets/artworks/artwork-path-3025.png";
import artworkPath3026 from "../../assets/artworks/artwork-path-3026.png";
import artworkGroup249 from "../../assets/artworks/artwork-group-249.png";

import { ReactComponent as UserIcon } from "../../assets/icons/icon_user.svg";

import "./index.scss";
import { useTranslation } from "react-i18next";

const DoctorAll = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();
  const { data: doctorAllData, error: doctorAllError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors`
  );

  useEffect(() => {
    if (doctorAllError) {
      navigate("/error", { replace: true });
    }
    document.title = "Our Doctors - Dr. Abdulla Kamal Medical Centre";
  }, [doctorAllData, currentLanguage, doctorAllError]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <section className="ourDoctors">
        <div className="ourDoctors-art__container">
          <img
            src={artworkPath73}
            alt="Artwork 1"
            className="ourDoctors-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkPath3025}
            alt="Artwork 2"
            className="ourDoctors-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkPath3026}
            alt="Artwork 3"
            className="ourDoctors-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup249}
            alt="Artwork 4"
            className="ourDoctors-art__container--art4"
            style={{ pointerEvents: "none" }}
          />
        </div>

        <div className="ourDoctors__container container">
          <h1 className="h1 text-purple">{t("ourDoctors.title")}</h1>
          <div className="ourDoctors__container--doctors">
            {doctorAllData ? (
              doctorAllData.data.map((item) => (
                <div
                  className="ourDoctors__container--doctors-image"
                  key={item._id}
                >
                  <Link to={item._id}>
                    <div>
                      <div className="doctors-image-tag">
                        {item.imageUrl === "" ||
                        item.imageUrl === "default.png" ||
                        !item.imageUrl ? (
                          <UserIcon className="user-placeholder" />
                        ) : (
                          <img
                            src={item.imageUrl}
                            alt={`${item["en-US"].firstname} ${item["en-US"].lastname}`}
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </div>
                      <div className="ourDoctors__container--doctors-caption text-center">
                        <h4>
                          <b>
                            {currentLanguage === "en"
                              ? item["en-US"].firstname
                              : item["ar-BH"].firstname}{" "}
                            {currentLanguage === "en"
                              ? item["en-US"].lastname
                              : item["ar-BH"].lastname}
                          </b>
                        </h4>
                        <p>
                          {currentLanguage === "en"
                            ? item["en-US"].designation
                            : item["ar-BH"].designation}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <PageLoader />
            )}
          </div>
        </div>
      </section>

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

export default DoctorAll;
