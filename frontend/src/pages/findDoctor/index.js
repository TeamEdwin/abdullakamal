import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import Axios from "axios";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import artworkPath3026 from "../../assets/artworks/artwork-path-3026.png";
import artworkGroup249 from "../../assets/artworks/artwork-group-249.png";
import artworkPath3025 from "../../assets/artworks/artwork-path-3025.png";

import "./index.scss";
import { useTranslation } from "react-i18next";

const FindDoctor = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [departmentID, setDepartmentID] = useState();
  const [doctorDB, setDoctorDB] = useState();

  const { data: departmentData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  const { data: doctorData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors`
  );

  const getDoctorsData = async (departmentId) => {
    var url;
    if (departmentId) {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/getdocbydepid/${departmentId}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/doctors`;
    }
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setDoctorDB(res.data.data);
        console.log(typeof res.data.data);
        console.log(Object.keys(res.data.data).length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctorId = e.target.doctor.value;
    navigate(`/doctors/${doctorId}`);
  };

  const handleDepartmentChange = (e) => {
    setDepartmentID(e.target.value);
  };

  useEffect(() => {
    getDoctorsData(departmentID);
    selectDoctorOptionRender();
    document.title = "Find A Doctor - Dr. Abdulla Kamal Medical Centre";
  }, [departmentData, doctorData, departmentID]);

  const selectDoctorOptionRender = () => {
    if (doctorDB && Object.keys(doctorDB).length <= 0) {
      return (
        <option value="" disabled>
          No doctors found on this department
        </option>
      );
    } else if (doctorDB) {
      return doctorDB.map((item) => (
        <option value={item._id} key={item._id}>
          {item["en-US"].firstname} {item["en-US"].lastname}
        </option>
      ));
    }
  };

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="findDoctor headerTopMargin">
        <div className="container">
          <div className="findDoctor-art__container">
            <img
              src={artworkGroup249}
              alt="Artwork 1"
              className="findDoctor-art__container--art1"
              style={{ pointerEvents: "none" }}
            />
            <img
              src={artworkPath3025}
              alt="Artwork 2"
              className="findDoctor-art__container--art2"
              style={{ pointerEvents: "none" }}
            />
            <img
              src={artworkPath3026}
              alt="Artwork 3"
              className="findDoctor-art__container--art3"
              style={{ pointerEvents: "none" }}
            />
          </div>

          {/* Title Toggle - Find Doctor & Request Appointment */}
          <div className="container findDoctor-title">
            <h1 className="active text-purple">
              {t("findADoctor.label_findADoctor")}
            </h1>
            <h1 className="divider text-purple">|</h1>
            <h1>
              <Link to="/request-appointment" className="inactive">
                {t("findADoctor.label_requestAppointment")}
              </Link>
            </h1>
          </div>

          <div className="container findDoctor__container text-white ltr-text">
            <div className="findDoctor__container--title">
              <h2 className="h2">
                {t("findADoctor.label_quickSearch")}
              </h2>
            </div>
            <div className="findDoctor__container--desc">
              <p>{t("findADoctor.label_quickSearch_description")}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="findDoctor__container--body">
                {/* Department */}
                <div className="findDoctor__container--select">
                  <label htmlFor="department">{t("findADoctor.label_form_department")} </label>
                  <div className="findDoctor__container--select-menu">
                    <select
                      name="department"
                      id="department"
                      className="akmc-input"
                      defaultValue={"default"}
                      onChange={handleDepartmentChange}
                    >
                      <option value="default" disabled>
                        Select Department
                      </option>
                      {departmentData &&
                        departmentData.data.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item["en-US"].departmentName} | {item["ar-BH"].departmentName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {/* Doctors */}
                <div className="findDoctor__container--select">
                  <label htmlFor="doctors">{t("findADoctor.label_form_doctorName")} </label>
                  <div className="findDoctor__container--select-menu">
                    <select
                      name="doctor"
                      id="doctors"
                      className="akmc-input"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Choose Doctor
                      </option>
                      {selectDoctorOptionRender()}
                    </select>
                  </div>
                </div>
              </div>
              <div className="findDoctor__container--footer">
                <input type="submit" value="SUBMIT" className="btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <AKMCFooter />
    </>
  );
};

export default FindDoctor;
