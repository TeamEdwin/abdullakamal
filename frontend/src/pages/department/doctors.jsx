import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import "./doctors.scss";

import { ReactComponent as UserIcon } from "../../assets/icons/icon_user.svg";
import { useTranslation } from "react-i18next";

const Doctors = (props) => {
  const scrollRef = useRef();
  const { t } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") || "en";
  const navigate = useNavigate();

  const { data: doctorsDataByDepartmentID, error } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/getdocbydepid/${props.departmentID}`
  );

  let mouseDown = false;
  let startX, scrollLeft;

  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const stopDragging = () => {
    mouseDown = false;
  };

  const m_down = (event) => {
    event.preventDefault();
    startDragging(event);
  };

  const m_up = (event) => {
    event.preventDefault();
    stopDragging();
  };

  const m_leave = (event) => {
    event.preventDefault();
    stopDragging();
  };

  const m_move = (event) => {
    event.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = event.pageX - scrollRef.current.offsetLeft;
    const scroll = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - scroll;
  };

  useEffect(() => {
    if (error) {
      navigate("/error", { replace: true });
    }
  }, [doctorsDataByDepartmentID, error]);

  return (
    <section className="departmentDoctors">
      <h1 className="h1 text-purple text-center">
        {t("ourDepartments.deparmtmentDetails.label_ourDoctors")}
      </h1>
      <div
        className="departmentDoctors__container"
        onMouseDown={m_down}
        onMouseUp={m_up}
        onMouseMove={m_move}
        onMouseLeave={m_leave}
        ref={scrollRef}
      >
        <div className="departmentDoctors__container--scroll">
          {doctorsDataByDepartmentID ? (
            doctorsDataByDepartmentID.data.length > 0 ? (
              doctorsDataByDepartmentID.data.map((item) => (
                <div
                  className="departmentDoctors__container--scroll-image"
                  key={item._id}
                >
                  <Link to={`/doctors/${item._id}`}>
                    <div>
                      <div className="departmentDoctors-image-tag">
                        {item.imageUrl === "" ||
                        item.imageUrl === "default.png" ||
                        !item.imageUrl ? (
                          <UserIcon className="user-placeholder" />
                        ) : (
                          <img
                            src={item.imageUrl}
                            alt={`${item.firstname} ${item.lastname}`}
                            style={{ pointerEvents: "none" }}
                          />
                        )}
                      </div>
                      <div className="departmentDoctors__container--scroll-caption">
                        <h4>
                          <b>
                            {currentLanguage === "en"
                              ? item["en-US"].firstname
                              : item["ar-BH"].firstname}{" "}
                            {currentLanguage === "en"
                              ? item["en-US"].lastname
                              : item["ar-BH"].lastname}
                          </b>
                        </h4>
                        <p>
                          {currentLanguage === "en"
                            ? item["en-US"].designation
                            : item["ar-BH"].designation}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="container">
                <h3>No Doctor found</h3>
              </div>
            )
          ) : (
            <PageLoader />
          )}
        </div>
      </div>
    </section>
  );
};

const PageLoader = () => {
  return (
    <div className="pageLoaderContainer">
      <div className="pageLoader"></div>
    </div>
  );
};

export default Doctors;
