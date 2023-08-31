import { useEffect, useState } from "react";
import useSWR from "swr";
import AKMCHeader from "../_common/header";
import AKMCStickyHeader from "../_common/sticky-header";
import AKMCFooter from "../_common/footer";
import StickyMenu from "../_common/sticky-menu";
import StickyChat from "../_common/sticky-chat";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import "./index.scss";

// const galleryData = [
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/DR.-JALAL-ABDULLA-KAMAL.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/DR.-SAMEERA-ABDULLA-KAMAL.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/DR.-LEASHA-SHAFIK.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/DR.-MUNNIR-MOHAMMED.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/DR.-AHMED-M-YAHYA.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Dr.-Fadi-A-Mouawad.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-2.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-3.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-1.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-2.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-3.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-4.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Senior-Staff-1.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Clinic-3.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Clinic-2.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Clinic-1.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Pathology-1.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Pathology-2.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Pathology-3.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Pathology-4.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Pathology-5.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Radiology-1.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Radiology-1.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Radiology-2.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/Radiology-2.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/General-Equipment-1.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/General-Equipment-1.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/General-Equipment-2.jpg",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/General-Equipment-3.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/General-Equipment-4.png",
//   },
//   {
//     imgUrl:
//       "https://akmcbucket.s3.ap-south-1.amazonaws.com/gallery/General-Equipment-5.png",
//   },
// ];

const Gallery = () => {
  const { data: GallaryData } = useSWR(
    `${process.env.REACT_APP_BACKEND_URL}/api/gallery`
  );
  const [sliderNumber, setSliderNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSliderNumber(index);
    setOpenModal(true);

    console.log(sliderNumber);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    sliderNumber === 0
      ? setSliderNumber(GallaryData.data.length - 1)
      : setSliderNumber(sliderNumber - 1);
  };

  const nextSlide = () => {
    sliderNumber + 1 === GallaryData.data.length
      ? setSliderNumber(0)
      : setSliderNumber(sliderNumber + 1);
  };

  useEffect(() => {}, [GallaryData]);

  return (
    <>
      <StickyMenu />

      <StickyChat />

      <AKMCStickyHeader />

      <AKMCHeader />

      {GallaryData && openModal && (
        <div className="sliderWrap">
          <CancelRoundedIcon className="btnClose" onClick={handleCloseModal} />
          <ArrowCircleLeftRoundedIcon className="btnPrev" onClick={prevSlide} />
          <ArrowCircleRightRoundedIcon
            className="btnNext"
            onClick={nextSlide}
          />
          <div
            className="sliderWrap__fullScreenImage"
            onClick={handleCloseModal}
          >
            <img src={GallaryData.data[sliderNumber].imageUrl} alt="AKMC" />
            <div className="sliderWrap__fullScreenImage--caption">
              <p>
                {sliderNumber + 1} of {GallaryData.data.length + 1}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="gallery">
        <div className="container">
          <h1 className="h1 text-purple">Gallery</h1>

          <div className="galleryWrap">
            {GallaryData &&
              GallaryData.data.map((slide, i) => (
                <div className="single" key={i}>
                  <img
                    src={slide.imageUrl}
                    alt="AKMC"
                    onClick={() => handleOpenModal(i)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <AKMCFooter />
    </>
  );
};

export default Gallery;
