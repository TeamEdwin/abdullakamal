import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import AKMCFooter from "../_common/footer";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import Doctors from "./doctors";
import HeroMain from "./hero-main";
import Specialties from "./specialties";
import HeroServices from "./hero-services";
import HealthFitness from "./health-fitness";
import InsuranceProviders from "./insurance-providers";
import Testimonials from "./testimonials";
import Gallery from "./Gallery";
import Instagram from "./Instagram";
import ContactUs from "../_shared/ContactUs";
import { useTranslation } from "react-i18next";

import "./index.scss";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fitnessPointsData, setFitnessPointsData] = useState();
  const [testimonialData, setTestimonialData] = useState();

  const { data: homePageData, error: homePageError } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/home`
  );

  useEffect(() => {
    if (homePageData) {
      setFitnessPointsData(homePageData.fitnessPoints);
      setTestimonialData(homePageData.testimonial);
    }

    if (homePageError) {
      navigate("/error", { replace: true });
    }

    document.title = "Home - Dr. Abdulla Kamal Medical Centre";
  }, [homePageData, homePageError]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <main>
        <HeroMain />

        <Specialties />

        <Doctors />

        <div className="ourDoctorsBtns">
          <div>
            <Link className="btn-secondary" to="/request-appointment">
              {t("home.doctor.btnLabel_consultNow")}
            </Link>
          </div>
        </div>

        <HeroServices />

        {fitnessPointsData && <HealthFitness data={fitnessPointsData} />}

        <InsuranceProviders />

        {testimonialData && <Testimonials data={testimonialData} />}

        <Gallery />

        <Instagram />

        <ContactUs />
      </main>

      <AKMCFooter />
    </>
  );
};

export default HomePage;
