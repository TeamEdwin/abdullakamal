import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
localStorage.removeItem("customer");
const Home = () => {
  const [homePageData, setHomePageData] = useState();

  // READ Testimonials & Fitness
  const getHomePageData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/home`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options).then((res) => {
      setHomePageData(res.data);
    });
  };

  // CREATE Testimonials
  const addTestimonial = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const testimonialData = {
      name: data.get("name"),
      subject: data.get("subject"),
      testimonial: data.get("description"),
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/testimonial`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: testimonialData,
    };
    console.log(options);
    await Axios(options).then((res) => {
      console.log("Testimonial Added!", res);
      getHomePageData();
      event.target.reset();
    });
  };

  // DELETE Testimonials
  const handleTestimonialDelete = async (testimonialID) => {
    let text = "Are you sure, Want to Delete the Testimonial?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/testimonial/${testimonialID}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          getHomePageData();
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          console.log("Testimonial Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  // CREATE fitness
  const addFitness = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const fitnessData = {
      "en-US": {
        points: data.get("points"),
      },
      "ar-BH": {
        points: data.get("points_ar"),
      },
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/fitness`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: fitnessData,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("Fitness Added!", res);
        getHomePageData();
        event.target.reset();
      })
      .catch((err) => console.log(err));
  };

  // DELETE Fitness
  const handleFitnessDelete = async (fitnessID) => {
    let text = "Are you sure, Want to Delete the Fitness?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/fitness/${fitnessID}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          getHomePageData();
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          console.log("Fitness Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getHomePageData();
    if (homePageData) {
      console.log(homePageData);
    }
  }, []);

  return (
    <>
      <h1>Home Page</h1>

      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={9}>
          {/* Testimonials */}
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Testimonials</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                {/* Testimonals Form */}
                <form onSubmit={addTestimonial}>
                  <FormGroup>
                    <TextField
                      type="text"
                      name="name"
                      label="Name"
                      size="small"
                      required
                    />
                    <TextField
                      type="text"
                      name="subject"
                      label="Subject"
                      size="small"
                      sx={{ mt: 2 }}
                      required
                    />
                    <TextField
                      label="Testimonial"
                      name="description"
                      multiline
                      size="small"
                      rows={4}
                      sx={{ mt: 2 }}
                      required
                    />
                    <Button type="submit" sx={{ mt: 2 }}>
                      Add Testimonial
                    </Button>
                  </FormGroup>
                </form>

                <Divider sx={{ my: 1 }} />
                {homePageData &&
                  homePageData.testimonial.map((item, i) => (
                    <div key={i}>
                      <div>
                        <h3>{item.name}</h3>
                        <h5>{item.subject}</h5>
                        <p>{item.testimonial}</p>
                        <div className="text-right">
                          <Button
                            onClick={() => handleTestimonialDelete(item._id)}
                            size="small"
                            color="error"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <Divider sx={{ my: 1 }} />
                    </div>
                  ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Health & Fitness Section */}
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Health &amp; Fitness Section</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                <form onSubmit={addFitness}>
                  <FormGroup>
                    <TextField
                      type="text"
                      name="points"
                      label="Health Fitness Points"
                      size="small"
                      required
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      type="text"
                      name="points_ar"
                      label="Health Fitness Points - Arabic"
                      size="small"
                      required
                    />
                    <Button type="submit" sx={{ mt: 2 }}>
                      Add Point
                    </Button>
                  </FormGroup>
                </form>
                <Divider sx={{ my: 1 }} />
                {homePageData &&
                  homePageData.fitnessPoints.map((item, i) => (
                    <div key={i}>
                      <div>
                        <p>
                          {item["en-US"].points} | {item["ar-BH"].points}
                        </p>
                        <div className="text-right">
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleFitnessDelete(item._id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <Divider sx={{ my: 1 }} />
                    </div>
                  ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
