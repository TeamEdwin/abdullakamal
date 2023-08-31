import { useEffect } from "react";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PackageAll = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const { data } = useSWR(`${process.env.REACT_APP_BACKEND_URL}/api/packages`);

  useEffect(() => {
    document.title = "Packages - Dr. Abdulla Kamal Medical Centre";
  }, [data]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="packageAll">
        <div className="container">
          <h1 className="h1 text-purple">{t("packages.title")}</h1>
          <div className="packageAll__container">
            {data ? (
              data.data.map((item, i) => (
                <div className="cardContainer" key={i}>
                  <Link to={`${item._id}`} key={item._id}>
                    <div className="packageAllCard flex">
                      <div className="packageAllCard__content">
                        <h3>
                          <b>
                            {currentLanguage === "en"
                              ? item["en-US"].title
                              : item["ar-BH"].title}
                          </b>
                        </h3>
                        <p>
                          {currentLanguage === "en"
                            ? item["en-US"].description
                            : item["ar-BH"].description}
                        </p>
                      </div>
                      <div className="image">
                        <img
                          src={`${item.packageImage}`}
                          alt="Package"
                          style={{ pointerEvents: "none" }}
                        />
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

export default PackageAll;
