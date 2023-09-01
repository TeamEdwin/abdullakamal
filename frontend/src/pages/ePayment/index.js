import { useEffect, useState } from "react";
import useSWR from "swr";

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

import axios from "axios";

const EPayment = () => {
  const { t } = useTranslation();
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
  const { data: packageData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/packages`
  );
  const [variants, setVariants] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState([]);
  const [price, setPrice] = useState();
  const [visibleDoctor, setVisibleDoctor] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("customer")) {
      localStorage.removeItem("customer");
    }

    const paymentBtn = document.querySelector(".ePayment__footer input");
    paymentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.title = "E-Payment - Dr. Abdulla Kamal Medical Centre";

      const url = `${process.env.REACT_APP_BACKEND_URL}/api/create-session`;

      // generate random number for order id
      const order_id = "#" + Math.floor(Math.random() * 10000);
      const name = document.querySelector("input[name=name]").value;
      const mobile = document.querySelector("input[name=mobile]").value;
      const email = document.querySelector("input[name=email]").value;
      const service_id = document.querySelector("select[name=Packages]").value;
      const variant_id = document.querySelector(
        "select[name=PackageVariants]"
      ).value;
      const doctor_id = document.querySelector("select[name=doctor]").value;
      const description = `Service: ${service_id} Doctor: ${doctor_id}`;

      // check if all fields are filled in or not
      if (
        name === "" ||
        mobile === "" ||
        email === "" ||
        service_id === "default" ||
        doctor_id === "default"
      ) {
        alert("Please fill in all the fields");
        return;
      } else {
        const amount = price;

        const data = {
          apiOperation: "INITIATE_CHECKOUT",
          interaction: {
            operation: "PURCHASE",
            timeout: 600,
            returnUrl: `${process.env.REACT_APP_FRONTEND_URL}/payment-success`,
            timeoutUrl: `${process.env.REACT_APP_FRONTEND_URL}/e-payment`,
            cancelUrl: `${process.env.REACT_APP_FRONTEND_URL}/e-payment`,
            merchant: {
              name: "APSHAR CONSULTANCY W.L.L",
              url: "https://developer.mastercard.com",
            },
            displayControl: {
              billingAddress: "HIDE",
              customerEmail: "MANDATORY",
            },
          },
          order: {
            id: order_id,
            amount: amount,
            currency: "BHD",
            description: description,
          },
          customer: {
            email: email,
            firstName: name,
            mobilePhone: mobile,
          },
        };

        let customer = {
          order_id: order_id,
          doctor_id: doctor_id,
          package_id: service_id,
          variant_id: variant_id,
          customer_name: name,
          customer_email: email,
          customer_phone: mobile,
          amount: amount,
        };
        localStorage.setItem("customer", JSON.stringify(customer));

        axios
          .post(url, data, {
            headers: {
              accept: "*",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((response) => {
            window.Checkout.configure({
              session: {
                id: response.data.sessionId,
              },
            });
            window.Checkout.showPaymentPage();
            console.log("Response:", response.data.sessionId);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }, [packageData, price]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <div className="ePayment headerTopMargin">
        <div className="container">
          <div className="ePayment-art__container">
            <img
              src={artworkGroup249}
              alt="Artwork 1"
              className="ePayment-art__container--art1"
              style={{ pointerEvents: "none" }}
            />
            <img
              src={artworkPath3025}
              alt="Artwork 2"
              className="ePayment-art__container--art2"
              style={{ pointerEvents: "none" }}
            />
            <img
              src={artworkPath3026}
              alt="Artwork 3"
              className="ePayment-art__container--art3"
              style={{ pointerEvents: "none" }}
            />
          </div>

          {/* Personal Information */}
          <div className="ePayment__personalInfo text-white ltr-text">
            <div className="ePayment__personalInfo--title">
              <h2 className="h2">{t("e-payment.label_personalInformation")}</h2>
            </div>
            <div className="ePayment__personalInfo--desc"></div>
            <div className="ePayment__personalInfo--body">
              <div className="ePayment__personalInfo--form">
                <form>
                  <div className="ePayment__personalInfo--form-group">
                    <label>
                      <span className="label">
                        {t("e-payment.label_form_fullName")}
                      </span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="akmc-input"
                      />
                    </label>
                  </div>
                  <div className="ePayment__personalInfo--form-group">
                    <label>
                      <span className="label">
                        {t("e-payment.label_form_phoneMobile")}
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        className="akmc-input"
                      />
                    </label>
                  </div>
                  <div className="ePayment__personalInfo--form-group">
                    <label>
                      <span className="label">
                        {t("e-payment.label_form_email")}
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="akmc-input"
                      />
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Service Information Block */}
          <div className="ePayment__service text-purple ltr-text">
            <div className="ePayment__service--title">
              <h2 className="h2">{t("e-payment.label_serviceInformation")}</h2>
            </div>
            <div className="ePayment__service--desc"></div>
            {/* Department */}
            <div className="ePayment__service--select">
              <label htmlFor="Package">{t("e-payment.label_service")} </label>
              <div className="ePayment__service--select-menu">
                <select
                  name="Packages"
                  id="Package"
                  className="akmc-input"
                  defaultValue={"default"}
                  onChange={(e) => {
                    const id = e.target.value;
                    axios
                      .get(
                        `${process.env.REACT_APP_BACKEND_URL}/api/getVariantsById/${id}`
                      )
                      .then((res) => {
                        setVisible(true);
                        setVariants(res.data.variant);
                      });
                    const url = `${process.env.REACT_APP_BACKEND_URL}/api/packages/${id}`;
                    const options = {
                      method: "GET",
                      url: url,
                      headers: {
                        "Accept-Language": currentLanguageCode,
                      },
                    };
                    axios(options)
                      .then((res) => {
                        res.data.data.associatedDoctors.forEach((option) => {
                          option.name =
                            option["en-US"].firstname +
                            " " +
                            option["en-US"].lastname;
                        });

                        setDoctorSelected(res.data.data.associatedDoctors);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  <option value="default" disabled>
                    Select Service
                  </option>
                  {packageData &&
                    packageData.data.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item["en-US"].title} | {item["ar-BH"].title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Service */}
            {visible && (
              <div className="ePayment__service--select">
                <label htmlFor="PackageVariant">
                  {t("e-payment.label_service")} Variants{" "}
                </label>
                <div className="ePayment__service--select-menu">
                  <select
                    name="PackageVariants"
                    id="PackageVariant"
                    className="akmc-input"
                    defaultValue={"default"}
                    onChange={(e) => {
                      // Find the selected variant in the variants array
                      const selectedVariant = variants.find(
                        (item) => item._id === e.target.value
                      );
                      setPrice(selectedVariant.price);
                      setVisibleDoctor(true);
                    }}
                  >
                    <option value="default" disabled>
                      Select Service
                    </option>
                    {/* Render options based on variants */}
                    {variants.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item["en-US"].title} | {item["ar-BH"].title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Preferred Doctor */}
            {visibleDoctor && (
              <div className="ePayment__service--select">
                <label htmlFor="doctors">{t("e-payment.label_doctor")} </label>
                <div className="ePayment__service--select-menu">
                  <select
                    name="doctor"
                    id="doctors"
                    className="akmc-input"
                    defaultValue={"default"}
                  >
                    <option value="default" disabled>
                      Choose Doctor
                    </option>
                    {doctorSelected &&
                      doctorSelected.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item["en-US"].firstname} {item["en-US"].lastname}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="ePayment__footer">
            <input
              type="button"
              value={
                price === undefined
                  ? t("e-payment.label_pay")
                  : t("e-payment.label_pay") + " " + price + " BHD"
              }
              className="btn-primary"
              disabled={false}
            />
          </div>
        </div>
      </div>

      <AKMCFooter />
    </>
  );
};

export default EPayment;
