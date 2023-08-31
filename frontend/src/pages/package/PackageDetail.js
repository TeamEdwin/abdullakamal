import { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import AKMCFooter from "../_common/footer";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";

import artwork223 from "../../assets/artworks/artwork-223.png";

import "./index.scss";
import { useTranslation } from "react-i18next";

const packageData = {
  _id: 101,
  title: "ANTENATAL PACKAGES",
  packageImage: "/assets/covers/pexels-kristina-paukshtite-3242264.jpg",
  varients: [
    {
      _id: 201,
      title: "1ST TRIMESTER (1ST THREE MONTHS)",
      features: `<ul> <li>Consultation (4)</li> <li>Ultrasound</li> <li>CBC, BLOOD GROUP, RH, TSH</li> <li> RUBELLA SCREENING, G6PD, SICKLING, URINE ANALYSIS, HIV, VDRL, HBsAG, Toxoplasma, Anti HCV, FBS </li> </ul>`,
      price: "120",
      currency: "BHD",
    },
    {
      _id: 202,
      title: "2ND TRIMESTER (FROM 4TH MONTH TO END OF 6TH MONTH)",
      features: `<ul> <li>Consultation (4)</li> <li>4D Ultrasonography</li> <li>CBC, OGTT 75, Urine Analysis.</li> </ul>`,
      price: "100",
      currency: "BHD",
    },
    {
      _id: 203,
      title: "3RD TRIMESTER (FROM 7TH MONTH TILL DELIVERY)",
      features: `<ul> <li>Consultation (6)</li> <li>Ultrasound (Growth Scan),</li> <li>CTG (2)</li> <li>CBC, RBS, Urine Analysis, HVS</li> </ul>`,
      price: "120",
      currency: "BHD",
    },
  ],
};

// const backgroundImgUrl =
//   "/assets/covers/pexels-kristina-paukshtite-3242264.jpg";
// const backgroundStyle = {
//   backgroundImage: `url("${backgroundImgUrl}")`,
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   height: "60rem",
//   position: "relative",
// };

const PackageDetail = () => {
  const packageSlug = useParams().packageId;
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();
  const { data: packageDBData, error: packageDBError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/packages/${packageSlug}`
  );

  useEffect(() => {
    if (packageDBError) {
      navigate("/error", { replace: true });
    }

    document.title = "Packages - Dr. Abdulla Kamal Medical Centre";
  }, [packageDBData, packageDBError]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      {packageDBData ? (
        <Fragment>
          <section
            className="package"
            style={{
              backgroundImage: `url("${packageDBData.data.packageImage}")`,
            }}
          >
            <div className="package__img-box">
              <img
                src={artwork223}
                alt="artwork223"
                className="package__img-box--artwork"
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div className="package__text-box text-white">
              <span className="package__text-box--main">
                <h1 className="display-header-1">
                  <span className="block">
                    {currentLanguage === "en"
                      ? packageDBData.data["en-US"].title
                      : packageDBData.data["ar-BH"].title}
                  </span>
                </h1>
              </span>
            </div>
          </section>

          <section className="package-features">
            <div className="container">
              {packageDBData.data.variants &&
                packageDBData.data.variants.map((item) => (
                  <div key={item._id}>
                    <h1>
                      {currentLanguage === "en"
                        ? item["en-US"].title
                        : item["ar-BH"].title}
                    </h1>
                    <div className="package-features--body">
                      <div className="package-features--body-desc">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              currentLanguage === "en"
                                ? item["en-US"].description
                                : item["ar-BH"].description,
                          }}
                        ></div>
                      </div>
                      {item.price ? (
                        <div className="package-features--body-price">
                          <Link to="/e-payment" className="btn-packagePrice">
                            <span>
                              {t(
                                "packages.packageDetails.label_btn_packagePrice"
                              )}
                            </span>
                            <span className="ltr-text">{item.price} BHD</span>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}

              <div className="mb-20"></div>
            </div>
          </section>
        </Fragment>
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

export default PackageDetail;
