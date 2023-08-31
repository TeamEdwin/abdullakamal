import { Link } from "react-router-dom";
import "./Gallery.scss";

import { useTranslation } from "react-i18next";

const ImageUrl = [
  {
    gId: 1,
    gUrl: "/assets/gallery/Senior-Staff-1.jpg",
    gAlt: "Senior-Staff-1",
  },
  {
    gId: 2,
    gUrl: "/assets/gallery/Clinic-2.png",
    gAlt: "Clinic-2",
  },
  {
    gId: 3,
    gUrl: "/assets/gallery/dr-jalal-abdulla-kamal.png",
    gAlt: "dr-jalal-abdulla-kamal",
  },
  {
    gId: 4,
    gUrl: "/assets/gallery/General-Equipment-1.png",
    gAlt: "General-Equipment-1",
  },
  {
    gId: 5,
    gUrl: "/assets/gallery/Senior-Staff-1.png",
    gAlt: "Senior-Staff-1",
  },
];

const Gallery = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="gallerySection ltr-text">
        <h1 className="h1 text-purple text-center">
          {t("home.gallery.title")}
        </h1>
        <div className="gallerySection__container">
          <img src={ImageUrl[0].gUrl} alt={ImageUrl[0].gAlt} />
          <img src={ImageUrl[1].gUrl} alt={ImageUrl[1].gAlt} />
          <img
            src={ImageUrl[2].gUrl}
            alt={ImageUrl[2].gAlt}
            className="twoRows"
          />
          <img src={ImageUrl[3].gUrl} alt={ImageUrl[3].gAlt} />
          <img src={ImageUrl[4].gUrl} alt={ImageUrl[4].gAlt} />
        </div>
        <div className="text-center">
          <Link to="gallery" className="btn-primary">
            {t("home.gallery.label_btn_showMore")}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Gallery;
