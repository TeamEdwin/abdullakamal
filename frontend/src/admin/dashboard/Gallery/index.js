import { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

import "./index.scss";

const Gallery = () => {
  const [GallaryData, setGallaryData] = useState();
  const [sliderNumber, setSliderNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (index) => {
    setSliderNumber(index);
    setOpenModal(true);
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

  const getGalleryImages = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/gallery`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setGallaryData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGallerySubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const valuedata = {
      // imageUrl: data.get("title"),
      imageUrl: Array.prototype.slice.call(event.target.files),
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/gallery`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: valuedata,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        getGalleryImages();
        console.log("Added!");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleGalleryImageDelete = () => {
    let text = "Are you sure, Want to Delete the Doctor?";
    if (window.confirm(text) === true) {
      deleteGalleryImage();
    } else {
    }
  };
  const deleteGalleryImage = async () => {
    setLoading(true);
    const imageId = GallaryData.data[sliderNumber]._id;
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/gallery/${imageId}`;
    const options = {
      method: "DELETE",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setLoading(false);
        getGalleryImages();
        console.log("Deleted!", res);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getGalleryImages();
  }, []);

  return (
    <>
      <h1>Gallery</h1>
      <div className="uploadContainer">
        <Box sx={{ position: "relative" }}>
          <Button
            variant="contained"
            component="label"
            size="large"
            disabled={loading}
          >
            Upload New Image
            <input
              hidden
              accept="image/*"
              name="gallaryImage"
              multiple
              type="file"
              onChange={handleGallerySubmit}
            />
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-1.2rem",
                  marginLeft: "-1rem",
                }}
              />
            )}
          </Button>
        </Box>
      </div>

      {GallaryData && openModal && (
        <div className="adminSliderWrap">
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
              <p style={{ display: "inline-block", marginRight: "2rem" }}>
                {sliderNumber + 1} of {GallaryData.data.length}
              </p>
              <Button
                variant="contained"
                color="error"
                size="small"
                disableElevation
                onClick={handleGalleryImageDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="gallery">
        <div className="adminGalleryWrap">
          {GallaryData &&
            GallaryData.data.map((slide, i) => (
              <div className="single" key={slide._id}>
                <img
                  src={slide.imageUrl}
                  alt="AKMC"
                  onClick={() => handleOpenModal(i)}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
