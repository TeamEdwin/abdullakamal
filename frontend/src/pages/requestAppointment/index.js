import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useSWR from "swr";
import dayjs from "dayjs";
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

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

const formatTime = (ISOTime) => {
  return dayjs(ISOTime).format("hh:mma");
};

const RequestAppointment = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [departmentID, setDepartmentID] = useState();
  const [doctorID, setDoctorID] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [doctorDB, setDoctorDB] = useState();
  const [slotsDB, setSlotsDB] = useState();

  const { data: departmentData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/department`
  );

  const { data: doctorData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/doctors`
  );

  // READ Doctors Data
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // READ Slots by Doctor & Date
  const getSlotsByDoctorAndDate = async (doctorId, date) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/slots/doctor/${doctorId}/date/${date}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setSlotsDB(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Appointment Submit
  const handleAppointmentSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const appointmentValues = {
      patientName: data.get("patientName"),
      patientPhone: data.get("patientPhone"),
      patientEmail: data.get("patientEmail"),
      doctor: data.get("doctor"),
      slot: data.get("slotID"),
      // appointmentDate: data.get("appointmentDate"),
      // appointmentTime: data.get("appointmentTime"),
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/appointment`;
    const options = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: appointmentValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        event.target.reset();
        if (res) {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        if (error) {
          alert(error.response.data.message);
        }
      });
  };

  // Handle Department Select Option Changes - to render doctors in that department
  const handleDepartmentChange = (e) => {
    setDepartmentID(e.target.value);
  };

  // Handle Doctors Select Option Changes
  const handleDoctorChange = (e) => {
    setDoctorID(e.target.value);
    setSelectedDate(formatDate(new Date()));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Set Doctor ID after search query param present
  const onSetSelectedDoctor = (doctorId) => {
    setDoctorID(doctorId);
  };

  useEffect(() => {
    // Select Doctor - If Search Query Params is set.
    if (searchParams.get("doctor")) {
      onSetSelectedDoctor(searchParams.get("doctor"));
      // console.log(searchParams.get("doctor"));
    }

    if (doctorID && selectedDate) {
      getSlotsByDoctorAndDate(doctorID, selectedDate);
    }

    getDoctorsData(departmentID);
    selectDoctorOptionRender();

    // Website Title
    document.title =
      "Request An Appointment - Dr. Abdulla Kamal Medical Centre";

    // MODAL CONFIGURATION
    // Get the modal
    // var modal = document.getElementById("myModal");
    // // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];
    // // When the user clicks on the button, open the modal
    // btn.onclick = function () {
    //   modal.style.display = "block";
    //   window.document.body.style.overflowY = "hidden";
    // };
    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //   modal.style.display = "none";
    //   window.document.body.style.overflowY = "scroll";
    // };
    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //     window.document.body.style.overflowY = "scroll";
    //   }
    // };
  }, [departmentData, doctorData, departmentID, selectedDate]);

  // SELECT OPTION Render for Doctor
  const selectDoctorOptionRender = () => {
    // if Search Query Params set for Doctor
    if (searchParams.get("doctor") && doctorData) {
      const doctorSettedData = doctorData.data.filter(
        (doc) => doc._id === doctorID
      );
      return doctorSettedData.map((item) => (
        <option value={item._id} key={item._id}>
          {`${item["en-US"].firstname} ${item["en-US"].lastname}`} |{" "}
          {item["ar-BH"].firstname} {item["ar-BH"].lastname}
        </option>
      ));
    }

    // if No Doctors on that Department
    if (doctorDB && Object.keys(doctorDB).length <= 0) {
      return (
        <option value="" disabled>
          No doctors found on this department
        </option>
      );
    }
    // if Doctor present on that Department
    else if (doctorDB) {
      return doctorDB.map((item) => (
        <option value={item._id} key={item._id}>
          {item["en-US"].firstname} {item["en-US"].lastname} |{" "}
          {item["ar-BH"].firstname} {item["ar-BH"].lastname}
        </option>
      ));
    }
  };

  const formatDate = (isoString) => {
    return dayjs(isoString).format("YYYY-MM-DD");
  };

  const formatDatePlusAddDay = (isoString) => {
    return dayjs(isoString).add(30, "day").format("YYYY-MM-DD");
  };

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="requestAppointment headerTopMargin">
        <form onSubmit={handleAppointmentSubmit}>
          <div className="container">
            <div className="requestAppointment-art__container">
              <img
                src={artworkGroup249}
                alt="Artwork 1"
                className="requestAppointment-art__container--art1"
                style={{ pointerEvents: "none" }}
              />
              <img
                src={artworkPath3025}
                alt="Artwork 2"
                className="requestAppointment-art__container--art2"
                style={{ pointerEvents: "none" }}
              />
              <img
                src={artworkPath3026}
                alt="Artwork 3"
                className="requestAppointment-art__container--art3"
                style={{ pointerEvents: "none" }}
              />
            </div>

            {/* Title Toggle - Find Doctor & Request Appointment */}
            <div className="requestAppointment-title">
              <Link to="/find-doctor" className="inactive">
                <h1>{t("requestAppointment.label_findADoctor")}</h1>
              </Link>
              <h1 className="divider text-purple">|</h1>
              <h1 className="active text-purple">
                {t("requestAppointment.label_requestAppointment")}
              </h1>
            </div>

            {/* Personal Information */}
            <div className="requestAppointment__personalInfo text-white ltr-text">
              <div className="requestAppointment__personalInfo--title">
                <h2 className="h2">
                  {t("requestAppointment.label_personalInformation")}
                </h2>
              </div>
              <div className="requestAppointment__personalInfo--desc"></div>
              <div className="requestAppointment__personalInfo--body">
                <div className="requestAppointment__personalInfo--form">
                  <div className="requestAppointment__personalInfo--form-group">
                    <label>
                      <span className="label">
                        {t("requestAppointment.label_form_fullName")}
                      </span>
                      <input
                        type="text"
                        name="patientName"
                        placeholder="Name"
                        className="akmc-input"
                        required
                      />
                    </label>
                  </div>
                  <div className="requestAppointment__personalInfo--form-group">
                    <label>
                      <span className="label">
                        {t("requestAppointment.label_form_phoneMobile")}
                      </span>
                      <input
                        type="tel"
                        name="patientPhone"
                        placeholder="Mobile Number"
                        className="akmc-input"
                        required
                      />
                    </label>
                  </div>
                  <div className="requestAppointment__personalInfo--form-group">
                    <label>
                      <span className="label">
                        {t("requestAppointment.label_form_email")}
                      </span>
                      <input
                        type="email"
                        name="patientEmail"
                        placeholder="Email Address"
                        className="akmc-input"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Appointment Block */}
            <div className="requestAppointment__schedule text-purple ltr-text">
              <div className="requestAppointment__personalInfo--title">
                <h2 className="h2">
                  {t("requestAppointment.label_scheduleAppointment")}
                </h2>
              </div>
              <div className="requestAppointment__personalInfo--desc"></div>
              {/* Department */}
              <div className="requestAppointment__schedule--select">
                <label htmlFor="department">
                  {t("requestAppointment.label_form_department")}{" "}
                </label>
                <div className="requestAppointment__schedule--select-menu">
                  <select
                    name="department"
                    id="department"
                    className="akmc-input"
                    defaultValue=""
                    onChange={handleDepartmentChange}
                    disabled={searchParams.get("doctor") ? true : false}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departmentData &&
                      departmentData.data.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item["en-US"].departmentName} |{" "}
                          {item["ar-BH"].departmentName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* Preferred Doctor */}
              <div className="requestAppointment__schedule--select">
                <label htmlFor="doctors">
                  {t("requestAppointment.label_form_doctorName")}{" "}
                </label>
                <div className="requestAppointment__schedule--select-menu">
                  <select
                    name="doctor"
                    id="doctors"
                    className="akmc-input"
                    defaultValue={doctorID || ""}
                    onChange={handleDoctorChange}
                    required
                  >
                    <option value="" disabled>
                      Choose Doctor
                    </option>
                    {selectDoctorOptionRender()}
                  </select>
                </div>
              </div>
              {/* Appointment Date */}
              <div className="requestAppointment__schedule--date">
                <label>
                  <span className="label">
                    {t("requestAppointment.label_form_appointmentDate")}
                  </span>
                  <input
                    type="date"
                    name="appointmentDate"
                    placeholder="Appointment Date"
                    className="akmc-input"
                    onChange={handleDateChange}
                    disabled={!doctorID}
                    min={formatDate(new Date())}
                    max={formatDatePlusAddDay(new Date())}
                    required
                  />
                </label>
              </div>
              {/* Appointment Time */}
              <div className="requestAppointment__schedule--select">
                <label htmlFor="appointmentTime">
                  {t("requestAppointment.label_form_appointmentTime")}
                </label>
                <div className="requestAppointment__schedule--select-menu">
                  <select
                    name="slotID"
                    id="appointmentTime"
                    className="akmc-input"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Choose Appointment Time
                    </option>
                    {slotsDB && slotsDB.length > 0 ? (
                      slotsDB.map((item, i) => (
                        <option
                          value={item._id}
                          key={i}
                          disabled={
                            dayjs().diff(item.startTime, "hour") > 0
                              ? "disabled"
                              : ""
                          }
                        >
                          {formatTime(item.startTime)} -{" "}
                          {formatTime(item.endTime)}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No Appointments Slots
                      </option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Check Availability BUTTON */}
            <div className="requestAppointment__footer">
              <input
                type="submit"
                value={`${t("requestAppointment.label_btn_bookAppointment")}`}
                className="btn-primary"
              />
            </div>
          </div>
        </form>

        {/* CONFIRM MODAL POPUP */}
        <span className="ModalPopup">
          {/* Trigger/Open The Modal */}
          {/* <button id="myBtn">Open Modal</button> */}

          {/* The Modal */}
          {/* Modal content */}
          {/* <div id="myModal" className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close">&times;</span>
                <h2>Appointment Successfully Scheduled</h2>
              </div>
              <div className="modal-body">
                <table>
                  <tbody>
                    <tr>
                      <th>Full Name</th>
                      <td>Jill</td>
                    </tr>
                    <tr>
                      <th>Phone / Mobile</th>
                      <td>879547744</td>
                    </tr>
                    <tr>
                      <th>Email Address</th>
                      <td>test@test.com</td>
                    </tr>
                  </tbody>
                </table>
                <h3>Schedule Appointment</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>Doctor's Name</th>
                      <td>Dr. Jalal Abdulla Kamal</td>
                    </tr>
                    <tr>
                      <th>Appointment Date</th>
                      <td>22/10/2022</td>
                    </tr>
                    <tr>
                      <th>Appointment Time</th>
                      <td>08:00 AM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div> */}
        </span>
      </div>

      <AKMCFooter />
    </>
  );
};

export default RequestAppointment;
