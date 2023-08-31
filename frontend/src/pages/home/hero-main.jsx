import "./hero-main.scss";
import artwork223 from "../../assets/artworks/artwork-223.png";
import { ReactComponent as IconCaduceus } from "../../assets/icons/icon_caduceus.svg";
import { ReactComponent as IconHospital } from "../../assets/icons/icon_hospital.svg";
import { ReactComponent as IconMicroscope } from "../../assets/icons/icon_microscope.svg";

import { Trans, useTranslation } from "react-i18next";

const HeroMain = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-main">
      <div className="hero-main__img-box">
        <img
          src={artwork223}
          alt="artwork223"
          className="hero-main__img-box--artwork"
          style={{ pointerEvents: "none" }}
        />
      </div>
      <div className="hero-main__text-box text-white">
        <span className="hero-main__text-box--main">
          <h1 className="display-header-1">
            {/* <span className="block">{t("home.hero-main.heading")}</span> */}
            {/* <span className="block">Health Care</span> */}
            <Trans i18nKey="home.hero-main.heading"></Trans>
          </h1>
        </span>
        <p className="hero-main__text-box--sub">
          {t("home.hero-main.subheading")}
        </p>
      </div>
      <div className="hero-main__feature">
        <div className="hero-main__feature-box">
          <IconCaduceus className="feature__icons" />
          <h2 className="h2 ltr-text">47+</h2>
          <div>{t("home.hero-main.label_years")}</div>
        </div>
        <div className="hero-main__feature-box">
          <IconHospital className="feature__icons" />
          <h2 className="h2 ltr-text">1974</h2>
          <div>{t("home.hero-main.label_since")}</div>
        </div>
        <div className="hero-main__feature-box">
          <IconMicroscope className="feature__icons" />
          <h2 className="h2 ltr-text">15+</h2>
          <div>{t("home.hero-main.label_departments")}</div>
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
