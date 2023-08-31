import "./hero-services.scss";
import { ReactComponent as IconDoctor } from "../../assets/icons/icon_doctor.svg";
import { ReactComponent as IconExperience } from "../../assets/icons/icon_experience.svg";
import { ReactComponent as IconIdea } from "../../assets/icons/icon_idea.svg";
import { ReactComponent as Icon24Hours } from "../../assets/icons/icon_24-hours.svg";
import { useTranslation } from "react-i18next";

const HeroServices = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-services">
      <div className="hero-services--title container">
        <h1 className="h1">{t("home.hero-services.title")}</h1>
        <p>{t("home.hero-services.subtitle")}</p>
      </div>
      <div className="hero-services--body container">
        <div className="hero-services--body-item">
          <IconDoctor className="icon_service" />
          <p>{t("home.hero-services.block_1")}</p>
        </div>
        <div className="hero-services--body-item">
          <IconExperience className="icon_service" />
          <p>{t("home.hero-services.block_2")}</p>
        </div>
        <div className="hero-services--body-item">
          <IconIdea className="icon_service" />
          <p>{t("home.hero-services.block_3")}</p>
        </div>
        <div className="hero-services--body-item">
          <Icon24Hours className="icon_service" />
          <p>{t("home.hero-services.block_4")}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroServices;
