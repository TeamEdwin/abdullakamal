import { useEffect } from "react";
import useSWR from "swr";
import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";

const Privacy = () => {
  const { data: privacyPage } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/privacy`
  );

  useEffect(() => {}, [privacyPage]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="container privacy-tc-container">
        <h1 className="privacy-tc-title">Privacy</h1>
        {privacyPage ? (
          privacyPage.data[0] && (
            <p className="privacy-tc-text">{privacyPage.data[0].privacyText}</p>
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

export default Privacy;
