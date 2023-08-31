import { useEffect, useRef } from "react";
import useSWR from "swr";
import artworkGroup231 from "../../assets/artworks/artwork-group-231.png";
import artworkGroup247 from "../../assets/artworks/artwork-group-247.png";
import artworkGroup498 from "../../assets/artworks/artwork-group-498.png";
import artworkGroup238 from "../../assets/artworks/artwork-group-238.png";
import "./insurance-providers.scss";
import { useTranslation } from "react-i18next";

// const data = [
//   {
//     id: 1,
//     image: "/assets/insurance/insurance-axa.png",
//   },
//   {
//     id: 2,
//     image: "/assets/insurance/insurance-health360.png",
//   },
//   {
//     id: 3,
//     image: "/assets/insurance/insurance-globemed.png",
//   },
//   {
//     id: 4,
//     image: "/assets/insurance/insurance-gems.png",
//   },
//   {
//     id: 5,
//     image: "/assets/insurance/insurance-mednet.png",
//   },
//   {
//     id: 6,
//     image: "/assets/insurance/insurance-aetna.png",
//   },
//   {
//     id: 7,
//     image: "/assets/insurance/insurance-saico.jpg",
//   },
//   {
//     id: 8,
//     image: "/assets/insurance/insurance-nasNeuron.png",
//   },
//   {
//     id: 9,
//     image: "/assets/insurance/insurance-cigna.jpg",
//   },
// ];

const InsuranceProviders = () => {
  const { t } = useTranslation();

  const { data: InsuranceProviderData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/insurance`
  );

  const scrollRef = useRef();

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

  useEffect(() => {}, [InsuranceProviderData]);

  return (
    <section className="insuranceProvider">
      <div className="insuranceProvider-art__container">
        <img
          src={artworkGroup231}
          alt="Artwork 1"
          className="insuranceProvider-art__container--art1"
          style={{ pointerEvents: "none" }}
        />
        <img
          src={artworkGroup247}
          alt="Artwork 2"
          className="insuranceProvider-art__container--art2"
          style={{ pointerEvents: "none" }}
        />
        <img
          src={artworkGroup498}
          alt="Artwork 3"
          className="insuranceProvider-art__container--art3"
          style={{ pointerEvents: "none" }}
        />
        <img
          src={artworkGroup238}
          alt="Artwork 4"
          className="insuranceProvider-art__container--art4"
          style={{ pointerEvents: "none" }}
        />
      </div>
      <div className="text-center text-purple">
        <h1 className="h1">{t("home.insuranceProviders.title")}</h1>
        <p>{t("home.insuranceProviders.subtitle")}</p>
      </div>
      <div className="insuranceCompanies">
        <div
          className="insuranceCompanies__container"
          onMouseDown={m_down}
          onMouseUp={m_up}
          onMouseMove={m_move}
          onMouseLeave={m_leave}
          ref={scrollRef}
        >
          <div className="insuranceCompanies__container--scroll">
            {InsuranceProviderData &&
              InsuranceProviderData.data.map((item) => (
                <div
                  className="insuranceCompanies__container--scroll-image"
                  key={item._id}
                >
                  <img
                    src={item.imageUrl}
                    alt="Doctor"
                    style={{ width: "100%", pointerEvents: "none" }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceProviders;
