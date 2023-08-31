import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyChat from "../_common/sticky-chat";
import StickyMenu from "../_common/sticky-menu";
import AKMCFooter from "../_common/footer";

import { ReactComponent as UserIcon } from "../../assets/icons/icon_user.svg";

import "./index.scss";
import { useTranslation } from "react-i18next";

const DoctorDetail = () => {
  const doctorId = useParams().doctorId;
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();
  const { data: doctorDetails, error: doctorDetailsError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors/${doctorId}`
  );

  useEffect(() => {
    if (doctorDetailsError) {
      navigate("/error", { replace: true });
    }
    document.title = "Doctor - Dr. Abdulla Kamal Medical Centre";
  }, [doctorDetails, doctorDetailsError, currentLanguage]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />
      {doctorDetails ? (
        <div className="doctorDetail">
          <div className="doctorDetail__container container">
            <span>
              <div className="doctorDetail__container--image">
                {doctorDetails.data.imageUrl === "" ||
                doctorDetails.data.imageUrl === "default.png" ||
                !doctorDetails.data.imageUrl ? (
                  <UserIcon className="user-placeholder" />
                ) : (
                  <img
                    src={doctorDetails.data.imageUrl}
                    alt={`${doctorDetails.data.firstname} ${doctorDetails.data.lastname}`}
                    style={{ pointerEvents: "none" }}
                  />
                )}
              </div>
              <Link
                to={`/request-appointment?doctor=${doctorDetails.data._id}`}
                className="btn-primary bookAppointmentBtn"
              >
                {t("ourDoctors.doctorDetails.label_btn_bookAnAppointment")}
              </Link>
            </span>
            <div className="doctorDetail__container--details">
              <h1 className="h1">
                {currentLanguage === "en"
                  ? doctorDetails.data["en-US"].firstname
                  : doctorDetails.data["ar-BH"].firstname}{" "}
                {currentLanguage === "en"
                  ? doctorDetails.data["en-US"].lastname
                  : doctorDetails.data["ar-BH"].lastname}
              </h1>
              <h2 className="subheader">
                {currentLanguage === "en"
                  ? doctorDetails.data["en-US"].designation
                  : doctorDetails.data["ar-BH"].designation}
              </h2>

              <h3 className="h3">
                {t("ourDoctors.doctorDetails.label_qualification")}
              </h3>
              <div
                className="doctorDetail__container--details-qualification"
                dangerouslySetInnerHTML={{
                  __html:
                    currentLanguage === "en"
                      ? doctorDetails.data["en-US"].qualification
                      : doctorDetails.data["ar-BH"].qualification,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoader />
      )}

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

export default DoctorDetail;
