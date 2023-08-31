import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./health-fitness.scss";

const HealthFitness = (props) => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";

  return (
    <section className="healthFitness">
      <div className="container">
        <h1 className="h1 text-center">{t("home.healthFitness.title")}</h1>
        <p className="text-center">{t("home.healthFitness.subtitle")}</p>
        <div className="healthFitness__body">
          <ul>
            {props.data &&
              props.data.map((item) => (
                <li key={item._id}>
                  {currentLanguage === "en"
                    ? item["en-US"].points
                    : item["ar-BH"].points}
                </li>
              ))}
          </ul>
        </div>
        <div className="text-center">
          <Link className="btn-primary" to="/health-information">
            {t("home.healthFitness.lable_btn_readMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HealthFitness;
