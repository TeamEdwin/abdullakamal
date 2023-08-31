import "./sticky-menu.scss";
import { ReactComponent as IconStethoscope } from "../../assets/icons/icon_stethoscope.svg";
import { ReactComponent as IconCalendar } from "../../assets/icons/icon_calendar.svg";
import { ReactComponent as IconUsers } from "../../assets/icons/icon_users.svg";
import { ReactComponent as IconCard } from "../../assets/icons/icon_card.svg";
import { ReactComponent as IconPackage } from "../../assets/icons/icon_package1.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StickyMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="side-nav">
      <div className="side-nav__container">
        <Link to="/find-doctor">
          <div className="tooltip">
            <IconStethoscope className="icon" />
            <span className="tooltiptext">{t("sticky-menu.label_findADoctor")}</span>
          </div>
        </Link>
        <hr />
        <Link to="/request-appointment">
          <div className="tooltip">
            <IconCalendar className="icon" />
            <span className="tooltiptext">{t("sticky-menu.label_scheduleAppointment")}</span>
          </div>
        </Link>
        <hr />
        <Link to="/packages">
          <div className="tooltip">
            <IconPackage className="icon" />
            <span className="tooltiptext">{t("sticky-menu.label_packages")}</span>
          </div>
        </Link>
        <hr />
        <Link to="/e-payment">
          <div className="tooltip">
            <IconCard className="icon" />
            <span className="tooltiptext">{t("sticky-menu.label_e-payment")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StickyMenu;
