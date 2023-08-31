import { useState } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { ThemeProvider } from "@emotion/react";

import theme from "../../styles/muiTheme.js";
import "./testimonials.scss";
import { useTranslation } from "react-i18next";

const Testimonials = (props) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  // const maxSteps = testimonialData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <section className="testimonials">
      <div className="testimonials__container ltr-text">
        <div className="testimonials__container--left">
          <h1 className="display-header-1">{t("home.testimonials.title")}</h1>
          <p>{t("home.testimonials.subtitle")}</p>
        </div>
        <div className="testimonials__container--right">
          <div className="stepper">
            <ThemeProvider theme={theme}>
              {props.data && props.data.length > 0 && (
                <Box sx={{ minWidth: 300, flexGrow: 1 }}>
                  <span className="stepper__drquote">&#x275D;</span>
                  <h2 className="h2">{props.data[activeStep].subject}</h2>
                  <Box sx={{ height: 255, minWidth: 300 }}>
                    {props.data[activeStep].testimonial}
                    <h3>&mdash; {props.data[activeStep].name}</h3>
                  </Box>
                  <MobileStepper
                    steps={props.data.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                      bgcolor: "akmcPrimary.dark",
                      color: "#bc7fcd",
                      "& .MuiMobileStepper-dotActive": {
                        bgcolor: "#bc7fcd",
                      },
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === props.data.length - 1}
                        sx={{ color: "#bc7fcd" }}
                        disableRipple
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ color: "#bc7fcd" }}
                        disableRipple
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              )}
            </ThemeProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
