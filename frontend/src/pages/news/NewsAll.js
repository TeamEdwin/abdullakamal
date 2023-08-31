import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import dayjs from "dayjs";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";
import { useTranslation } from "react-i18next";

const formatDate = (ISODate) => {
  return dayjs(ISODate).format("MMM DD, YYYY");
};

const NewsAll = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";

  const { data: storiesData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/stories`,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (storiesData) {
      console.log(storiesData.data);
    }
    document.title = "News - Dr. Abdulla Kamal Medical Centre";
  }, [storiesData]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      {storiesData ? (
        <div className="news">
          <div className="container">
            <div className="news__primary">
              {/* Whats Hot */}
              {storiesData.data[0] && (
                <div className="news__primary--hotNews">
                  <h1 className="h1 text-purple">{t("blog.label_whatsHot")}</h1>
                  <div className="news__primary--hotNews-coverImg">
                    <img src={storiesData.data[0].imageUrl} alt="Staff" />
                    <div className="news__primary--hotNews-coverImg-Info text-purple">
                      <p>{formatDate(storiesData.data[0].createdAt)}</p>
                      <h3 className="h3">
                        {currentLanguage === "en"
                          ? storiesData.data[0]["en-US"].title
                          : storiesData.data[0]["ar-BH"].title}
                      </h3>
                      <p
                        className="shortDesc"
                        dangerouslySetInnerHTML={{
                          __html:
                            currentLanguage === "en"
                              ? storiesData.data[0]["en-US"].body
                              : storiesData.data[0]["ar-BH"].body,
                        }}
                      ></p>
                      <Link
                        to={`${storiesData.data[0]._id}`}
                        className="btn-primary-small"
                      >
                        {t("blog.label_btn_readMore")}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {/* Three Row Post */}
              <div className="news__primary--list text-purple">
                {storiesData.data[0] &&
                  storiesData.data[2] &&
                  storiesData.data.slice(0, 3).map((item) => (
                    <Fragment key={item._id}>
                      <div className="news__primary--list-item">
                        <p className="publishDate">
                          {formatDate(item.createdAt)}
                        </p>
                        <h3 className="h3">
                          {currentLanguage === "en"
                            ? item["en-US"].title
                            : item["ar-BH"].title}
                        </h3>
                        <p
                          className="shortDesc"
                          dangerouslySetInnerHTML={{
                            __html:
                              currentLanguage === "en"
                                ? item["en-US"].body
                                : item["ar-BH"].body,
                          }}
                        ></p>
                        <Link to={item._id} className="btn-primary-small">
                          {t("blog.label_btn_readMore")}
                        </Link>
                      </div>
                      <hr />
                    </Fragment>
                  ))}
              </div>
            </div>
            <div className="secondary">
              {/* List of Blog Posts */}
              {storiesData.data.map((item) => (
                <div className="secondary__listItem text-purple" key={item._id}>
                  <div className="secondary__listItem-image">
                    <img src={item.imageUrl} alt="Blog Post" width="100%" />
                  </div>
                  <p className="publishDate">{formatDate(item.createdAt)}</p>
                  <h3 className="h3">
                    {currentLanguage === "en"
                      ? item["en-US"].title
                      : item["ar-BH"].title}
                  </h3>
                  <p
                    className="shortDesc"
                    dangerouslySetInnerHTML={{
                      __html:
                        currentLanguage === "en"
                          ? item["en-US"].body
                          : item["ar-BH"].body,
                    }}
                  ></p>

                  <Link to={`${item._id}`} className="btn-primary-small">
                    {t("blog.label_btn_readMore")}
                  </Link>
                </div>
              ))}
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

export default NewsAll;
