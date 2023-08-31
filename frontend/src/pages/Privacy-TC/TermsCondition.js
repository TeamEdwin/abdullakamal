import { useEffect } from "react";
import useSWR from "swr";
import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";

const TermsCondition = () => {
  const { data: termsPage } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/terms`
  );

  useEffect(() => {}, [termsPage]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="container privacy-tc-container">
        <h1 className="privacy-tc-title">Terms & Condition</h1>
        {termsPage ? (
          termsPage.data[0] && (
            <p className="privacy-tc-text">{termsPage.data[0].termsText}</p>
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

export default TermsCondition;
