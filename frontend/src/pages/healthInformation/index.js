import { useEffect } from "react";
import useSWR from "swr";

import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";
import AKMCFooter from "../_common/footer";

import "./index.scss";

import artwork223 from "../../assets/artworks/artwork-223.png";
import artworkPath3177 from "../../assets/artworks/artwork-path-3177.png";
import artworkGroup497 from "../../assets/artworks/artwork-group-497.png";
import artworkGroup498 from "../../assets/artworks/artwork-group-498.png";
import artworkGroup238 from "../../assets/artworks/artwork-group-238.png";
import artworkPath3025 from "../../assets/artworks/artwork-path-3025.png";
import artworkGroup451 from "../../assets/artworks/artwork-group-451.png";
import artworkPath3026 from "../../assets/artworks/artwork-path-3026.png";
import artworkGroup458 from "../../assets/artworks/artwork-group-458.png";

const healthInfoData = [
  {
    _id: 2024145,
    title: "EAT A HIGH PROTEIN FOOD AT EACH MEAL",
    description:
      "lean protein is recommended and which should constitute at least 40% of the total caloric value of each meal. Recommended sources are fish, fowl and lean beef. Other good sources of protein include bean and grain combinations and eggs. Increased protein intake is necessary in order to increase the metabolic rate and energy production.",
    imgUrl: "/assets/healthInfo/pngfind.com-seafood-png-6685198.png",
  },
  {
    _id: 45165441,
    title: "INCREASE FREQUENCY OF MEALS",
    description:
      "While decreasing the total caloric intake of each meal. This is suggested in order to sustain the level of nutrients necessary for energy production, and decrease blood sugar fluctuations.",
    imgUrl: "/assets/healthInfo/pngegg (1).png",
  },
  {
    _id: 451457654,
    title: "EAT A MODERATE AMOUNT OF UNREFINED CARBOHYDRATES",
    description:
      "Carbohydrates intake should not exceed 40% pf total daily caloric intake. Excellent sources of unrefined carbohydrates include whole grain products, legumes and root vegetables.",
    imgUrl: "/assets/healthInfo/imgbin_dal-legume-grain-bean-cereal-png.png",
  },
  {
    _id: 546865147,
    title: "AVOID ALL SUGARS AND REFINED CARBOHYDRATES",
    description:
      "This includes white and brown sugar, honey, candy, soda pop, cake, pastries, alcohol and white bread.",
    imgUrl: "/assets/healthInfo/imgbin_sugar-png.png",
  },
  {
    _id: 35718463,
    title: "AVOID HIGH PURINE PROTEIN",
    description:
      "Sources of high purine protein include: liver, kidney heart, sardines, mackerel and salmon.",
    imgUrl:
      "/assets/healthInfo/toppng.com-we-also-offer-complimentary-fish-frying-at-all-of-our-fish-and-seafood-532x291.png",
  },
  {
    _id: 357187463,
    title: "REDUCE OR AVOID MILK PRODUCTS",
    description:
      "Due to elevated fat content and high levels calcium, milk and milk products including “low-fat” milk should be reduced to no more than once every three to four days.",
    imgUrl:
      "/assets/healthInfo/[CITYPNG.COM]HD Real Glass Of Milk Splatter Splash PNG - 680x1019.png",
  },
  {
    _id: 567137630,
    title: "REDUCE INTAKE OF FATS AND OILS",
    description:
      "Fats and oil include fried foods, cream, butter, salad dressings, mayonnaise, etc… Fat intake should not exceed 20% of the total caloric intake.",
    imgUrl: "/assets/healthInfo/favpng_olive-oil-vegetable-oil-seed-oil.png",
  },
  {
    _id: 654064747,
    title: "REDUCE FRUIT JUICE INTAKE",
    description:
      "Until the next evaluation. This includes orange juice, apple juice, grape juice and grapefruit juice. Note: Vegetable juices are acceptable.",
    imgUrl:
      "/assets/healthInfo/favpng_ice-cream-juice-soft-drink-milkshake.png",
  },
  {
    _id: 789069401,
    title: "AVOID CALCIUM AND / OR VITAMIN D SUPPLEMENTS",
    description: "Unless recommended by physician.",
    imgUrl: "/assets/healthInfo/pngegg (2).png",
  },
];

const HealthInformation = () => {
  const { data: healthInfo } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/health`
  );

  useEffect(() => {
    if (healthInfo) {
      console.log("Where", healthInfo.data);
    }
    document.title = "Health Information - Dr. Abdulla Kamal Medical Centre";
  }, []);

  // const renderItems = () => {
  //   Array(8)
  //     .fill(2)
  //     .map((_, i) => console.log(i));
  // };

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      <section className="healthInfo">
        <div className="healthInfo__img-box">
          <img
            src={artwork223}
            alt="artwork223"
            className="healthInfo__img-box--artwork"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="healthInfo__text-box text-white">
          <span className="healthInfo__text-box--main">
            <h1 className="display-header-1">
              <span className="block">
                DIETARY GUIDELINES FOR SLOW METABOLIZERS
              </span>
            </h1>
          </span>
        </div>
      </section>

      {/* {healthInfo.map((item, i) => (
        <>
          <h1 className={`design${i}`}>{item}</h1>
        </>
      ))} */}

      {healthInfo &&
        healthInfo.data.map((item, i) => (
          <section className={`healthInfoBlock${1 + (i % 5)}`} key={i}>
            <div className={`healthInfoBlock${1 + (i % 5)}-art__container`}>
              <img
                src={artworkPath3177}
                alt="Artwork 5"
                className={`healthInfoBlock${1 + (i % 5)}-art__container--art1`}
                style={{ pointerEvents: "none" }}
              />
              <img
                src={artworkGroup497}
                alt="Artwork 6"
                className={`healthInfoBlock${1 + (i % 5)}-art__container--art2`}
                style={{ pointerEvents: "none" }}
              />
              <img
                src={artworkGroup498}
                alt="Artwork 7"
                className={`healthInfoBlock${1 + (i % 5)}-art__container--art3`}
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div
              className={`container healthInfoBlock${
                1 + (i % 5)
              }__container text-purple`}
            >
              <div className={`healthInfoBlock${1 + (i % 5)}__container--text`}>
                <h1 className="h2">{item.healthTitle}</h1>
                <p>{item.description}</p>
              </div>
              <div
                className={`healthInfoBlock${1 + (i % 5)}__container--image`}
              >
                <img
                  className="image"
                  src={item.svgImage}
                  alt="Senior Staff"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </div>
          </section>
        ))}

      {/* <section className="healthInfoBlock" key={healthInfoData[0]._id}>
        <div className="healthInfoBlock-art__container">
          <img
            src={artworkPath3177}
            alt="Artwork 5"
            className="healthInfoBlock-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 6"
            className="healthInfoBlock-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup498}
            alt="Artwork 7"
            className="healthInfoBlock-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock__container text-purple">
          <div className="healthInfoBlock__container--text">
            <h1 className="h2">{healthInfoData[0].title}</h1>
            <p>{healthInfoData[0].description}</p>
          </div>
          <div className="healthInfoBlock__container--image">
            <img
              className="image"
              src={healthInfoData[0].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock2" key={healthInfoData[1]._id}>
        <div className="healthInfoBlock2-art__container">
          <img
            src={artworkGroup238}
            alt="Artwork 5"
            className="healthInfoBlock2-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 6"
            className="healthInfoBlock2-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup498}
            alt="Artwork 7"
            className="healthInfoBlock2-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock2__container text-white">
          <div className="healthInfoBlock2__container--text">
            <h1 className="h2">{healthInfoData[1].title}</h1>
            <p>{healthInfoData[1].description}</p>
          </div>
          <div className="healthInfoBlock2__container--image">
            <img
              className="image"
              src={healthInfoData[1].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock3" key={healthInfoData[2]._id}>
        <div className="healthInfoBlock3-art__container">
          <img
            src={artworkPath3025}
            alt="Artwork 5"
            className="healthInfoBlock3-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup451}
            alt="Artwork 6"
            className="healthInfoBlock3-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 7"
            className="healthInfoBlock3-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock3__container text-purple">
          <div className="healthInfoBlock3__container--text">
            <h1 className="h2">{healthInfoData[2].title}</h1>
            <p>{healthInfoData[2].description}</p>
          </div>
          <div className="healthInfoBlock3__container--image">
            <img
              className="image"
              src={healthInfoData[2].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock4" key={healthInfoData[3]._id}>
        <div className="healthInfoBlock4-art__container">
          <img
            src={artworkPath3026}
            alt="Artwork 6"
            className="healthInfoBlock4-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup498}
            alt="Artwork 7"
            className="healthInfoBlock4-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock4__container text-purple">
          <div className="healthInfoBlock4__container--text">
            <h1 className="h2">{healthInfoData[3].title}</h1>
            <p>{healthInfoData[3].description}</p>
          </div>
          <div className="healthInfoBlock4__container--image">
            <img
              className="image"
              src={healthInfoData[3].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock5" key={healthInfoData[4]._id}>
        <div className="healthInfoBlock5-art__container">
          <img
            src={artworkPath3177}
            alt="Artwork 5"
            className="healthInfoBlock5-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 6"
            className="healthInfoBlock5-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup458}
            alt="Artwork 7"
            className="healthInfoBlock5-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock5__container text-white">
          <div className="healthInfoBlock5__container--text">
            <h1 className="h2">{healthInfoData[4].title}</h1>
            <p>{healthInfoData[4].description}</p>
          </div>
          <div className="healthInfoBlock5__container--image">
            <img
              className="image"
              src={healthInfoData[4].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock2" key={healthInfoData[5]._id}>
        <div className="healthInfoBlock2-art__container">
          <img
            src={artworkGroup238}
            alt="Artwork 5"
            className="healthInfoBlock2-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 6"
            className="healthInfoBlock2-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup498}
            alt="Artwork 7"
            className="healthInfoBlock2-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock2__container text-white">
          <div className="healthInfoBlock2__container--text">
            <h1 className="h2">{healthInfoData[5].title}</h1>
            <p>{healthInfoData[5].description}</p>
          </div>
          <div className="healthInfoBlock2__container--image">
            <img
              className="image"
              src={healthInfoData[5].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock3" key={healthInfoData[6]._id}>
        <div className="healthInfoBlock3-art__container">
          <img
            src={artworkPath3025}
            alt="Artwork 5"
            className="healthInfoBlock3-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup451}
            alt="Artwork 6"
            className="healthInfoBlock3-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 7"
            className="healthInfoBlock3-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock3__container text-purple">
          <div className="healthInfoBlock3__container--text">
            <h1 className="h2">{healthInfoData[6].title}</h1>
            <p>{healthInfoData[6].description}</p>
          </div>
          <div className="healthInfoBlock3__container--image">
            <img
              className="image"
              src={healthInfoData[6].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock4" key={healthInfoData[7]._id}>
        <div className="healthInfoBlock4-art__container">
          <img
            src={artworkPath3026}
            alt="Artwork 6"
            className="healthInfoBlock4-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup498}
            alt="Artwork 7"
            className="healthInfoBlock4-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock4__container text-purple">
          <div className="healthInfoBlock4__container--text">
            <h1 className="h2">{healthInfoData[7].title}</h1>
            <p>{healthInfoData[7].description}</p>
          </div>
          <div className="healthInfoBlock4__container--image">
            <img
              className="image"
              src={healthInfoData[7].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      <section className="healthInfoBlock5" key={healthInfoData[8]._id}>
        <div className="healthInfoBlock5-art__container">
          <img
            src={artworkPath3177}
            alt="Artwork 5"
            className="healthInfoBlock5-art__container--art1"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup497}
            alt="Artwork 6"
            className="healthInfoBlock5-art__container--art2"
            style={{ pointerEvents: "none" }}
          />
          <img
            src={artworkGroup458}
            alt="Artwork 7"
            className="healthInfoBlock5-art__container--art3"
            style={{ pointerEvents: "none" }}
          />
        </div>
        <div className="container healthInfoBlock5__container text-white">
          <div className="healthInfoBlock5__container--text">
            <h1 className="h2">{healthInfoData[8].title}</h1>
            <p>{healthInfoData[8].description}</p>
          </div>
          <div className="healthInfoBlock5__container--image">
            <img
              className="image"
              src={healthInfoData[8].imgUrl}
              alt="Senior Staff"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </section> */}

      <AKMCFooter />
    </>
  );
};

export default HealthInformation;
