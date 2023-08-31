import { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const NewsDetail = () => {
  const { newsId } = useParams();
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();
  const { data: storyData, error: storyError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/stories/${newsId}`,
    { revalidate: false }
  );

  const { data: storiesData, error: storiesError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/stories`,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (storyError || storiesError) {
      navigate("/error", { replace: true });
    }
    document.title = "News - Dr. Abdulla Kamal Medical Centre";
  }, [storyData, storiesData, storyError, storiesError]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="newsDetail">
        {storyData ? (
          <div className="container">
            <div className="newsDetail__primary">
              <div className="newsDetail__primary--hotNews">
                <div className="newsDetail__primary--hotNews-coverImg">
                  <img src={storyData.imageUrl} alt="Staff" />
                </div>
              </div>
              <div className="newsDetail__primary--list text-purple">
                {storiesData.data[0] &&
                  storiesData.data[2] &&
                  storiesData.data.slice(0, 3).map((item) => (
                    <Fragment key={item._id}>
                      <div className="newsDetail__primary--list-item">
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
                        <Link
                          to={`/news/${item._id}`}
                          className="btn-primary-small"
                        >
                          {t("blog.label_btn_readMore")}
                        </Link>
                      </div>
                      <hr />
                    </Fragment>
                  ))}
              </div>
            </div>

            <div className="newsDetail__body text-purple">
              <p className="publishDate">{formatDate(storyData.createdAt)}</p>
              <h1 className="h1">
                {currentLanguage === "en"
                  ? storyData["en-US"].title
                  : storyData["ar-BH"].title}
              </h1>

              <div
                className="quillContent"
                dangerouslySetInnerHTML={{
                  __html:
                    currentLanguage === "en"
                      ? storyData["en-US"].body
                      : storyData["ar-BH"].body,
                }}
              ></div>
            </div>
          </div>
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

export default NewsDetail;
