import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { ReactSVG } from "react-svg";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";
import { useTranslation } from "react-i18next";

const DepartmentAll = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();

  const { data: departmentData, error: departmentError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  useEffect(() => {
    if (departmentError) {
      navigate("/error", { replace: true });
    }
    document.title = "Departments - Dr. Abdulla Kamal Medical Centre";
  }, [departmentData, departmentError, currentLanguage]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="departmentAll container">
        <h1 className="text-purple">{t("ourDepartments.title")}</h1>
        <div className="department__list mt-20">
          {departmentData ? (
            departmentData.data.map((item, i) => (
              <div className="department__list--item" key={i}>
                <Link to={`${item._id}`}>
                  <div className="department__list--item-icon">
                    <ReactSVG
                      src={item.svgImage}
                      className="department__icons"
                    />
                  </div>
                  <div className="department__list--item-caption">
                    {currentLanguage === "en"
                      ? item["en-US"].departmentName
                      : item["ar-BH"].departmentName}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <PageLoader />
          )}
        </div>
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

export default DepartmentAll;
