import { useEffect } from "react";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";

import artworkPath73 from "../../assets/artworks/artwork-path-73.png";
import artworkPath3025 from "../../assets/artworks/artwork-path-3025.png";
import artworkPath3026 from "../../assets/artworks/artwork-path-3026.png";
import artworkGroup249 from "../../assets/artworks/artwork-group-249.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const InsuranceProviders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: InsuranceProviderData, error: InsuranceProviderError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/insurance`
  );

  useEffect(() => {
    if (InsuranceProviderError) {
      navigate("/error", { replace: true });
    }
    document.title = "Insurance Providers - Dr. Abdulla Kamal Medical Centre";
  }, [InsuranceProviderData, InsuranceProviderError]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <section className="insuranceProviders">
        <div className="insuranceProviders-art__container">
          <img
            src={artworkPath73}
            alt="Artwork 1"
            className="insuranceProviders-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkPath3025}
            alt="Artwork 2"
            className="insuranceProviders-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkPath3026}
            alt="Artwork 3"
            className="insuranceProviders-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup249}
            alt="Artwork 4"
            className="insuranceProviders-art__container--art4"
            style={{ pointerEvents: "none" }}
          />
        </div>

        <div className="insuranceProviders__container container">
          <h1 className="h1 text-purple">{t("insuranceProviders.title")}</h1>
          <div className="insuranceProviders__container--provider">
            {InsuranceProviderData ? (
              InsuranceProviderData.data.map((item) => (
                <div
                  className="insuranceProviders__container--provider-image"
                  key={item._id}
                >
                  <div>
                    <img
                      src={item.imageUrl}
                      alt="Insurance Provider"
                      style={{ pointerEvents: "none" }}
                    />
                  </div>
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

export default InsuranceProviders;
