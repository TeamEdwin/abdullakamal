import { Fragment, useEffect } from "react";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";
import Doctors from "./doctors";

import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

const DepartmentDetail = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const departmentID = useParams().departmentID;
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";

  const { data: departmentDetails, error: departmentDetailsError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department/id/${departmentID}`
  );

  useEffect(() => {
    if (departmentDetailsError) {
      navigate("/error", { replace: true });
    }
    document.title = "Department - Dr. Abdulla Kamal Medical Centre";
  }, [departmentDetails, departmentDetailsError, currentLanguage]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      {departmentDetails ? (
        <Fragment>
          <div
            className="department__cover"
            style={{
              backgroundImage: `linear-gradient(to bottom right, rgba(188, 127, 205, 0.4), rgba(255, 255, 255, 0.4)), url("${departmentDetails.data.coverImage}")`,
            }}
          >
            <div className="text-purple department__cover--title">
              <h1>
                {currentLanguage === "en"
                  ? departmentDetails.data["en-US"].departmentName
                  : departmentDetails.data["ar-BH"].departmentName}
              </h1>
            </div>
          </div>
          <div className="department__description">
            <div className="container">
              <h2 className="h2 text-purple">
                {t(
                  "ourDepartments.deparmtmentDetails.label_addressTheFollowingCases"
                )}
              </h2>
              <div
                className="department__description-content text-purple"
                dangerouslySetInnerHTML={{
                  __html:
                    currentLanguage === "en"
                      ? departmentDetails.data["en-US"].description
                      : departmentDetails.data["ar-BH"].description,
                }}
              ></div>
            </div>
          </div>
        </Fragment>
      ) : (
        <PageLoader />
      )}

      <Doctors departmentID={departmentID} />

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

export default DepartmentDetail;
