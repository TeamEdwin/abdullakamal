import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import Axios from "axios";
import { AuthProvider } from "./context/auth";
import { Toaster } from "react-hot-toast";
import { MediaProvider } from "./context/media";

import App from "./App";
import ScrollToTop from "./helpers/scrollToTop";
import "./index.scss";

// import i18n (needs to be bundled ;))
import "./helpers/i18n";

const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";

const fetcher = (url) =>
  Axios.get(url, { headers: { "Accept-Language": currentLanguageCode } }).then(
    (res) => res.data
  );

const MainPageLoader = () => {
  return (
    <div className="loaderContainer">
      <div className="loader"></div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Suspense fallback={<MainPageLoader />}>
    <AuthProvider>
      <MediaProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <SWRConfig value={{ fetcher }}>
            <App />
          </SWRConfig>
        </BrowserRouter>
      </MediaProvider>
    </AuthProvider>
  </React.Suspense>
);
