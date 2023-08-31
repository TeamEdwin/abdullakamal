import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import useSWR from "swr";
import "./specialties.scss";

import { useTranslation } from "react-i18next";

const Specialties = () => {
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";

  const { data } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  useEffect(() => {}, [data]);

  return (
    <section className="specialties container">
      <div className="specialties__text-box text-purple">
        <h1 className="h1">{t("home.specialties.label_specialties")}</h1>
        <p>{t("home.specialties.description")}</p>
      </div>
      <div className="department__list">
        {data &&
          data.data.map((item, i) => (
            <div className="department__list--item" key={i}>
              <Link to={`departments/${item._id}`}>
                <div className="department__list--item-icon">
                  <ReactSVG src={item.svgImage} className="department__icons" />
                </div>
                <div className="department__list--item-caption">
                  {currentLanguage === "en"
                    ? item["en-US"].departmentName
                    : item["ar-BH"].departmentName}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Specialties;
