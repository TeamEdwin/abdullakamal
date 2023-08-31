import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";

const AboutUs = () => {
  const [aboutUsPageData, setAboutUsPageData] = useState();
  const [values, setValues] = useState();
  const [goalsValues, setGoalsValues] = useState();
  const [patientRightsValues, setPatientRightsValues] = useState();

  // READ About Us Page Data
  const getAboutUsPageData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/aboutus`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setAboutUsPageData(res.data.data[0]);
        setValues(res.data.data[0]);
        setGoalsValues(res.data.goals);
        setPatientRightsValues(res.data.patientRights);
      })
      .catch((err) => console.log(err));
  };

  // CREATE About Us
  const addAboutUs = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const aboutUsData = {
      "en-US": {
        aboutUs: data.get("aboutUs"),
        messageFromFounder: data.get("messageFromFounder"),
        featurePoints: data.get("featurePoints"),
        quote: data.get("quote"),
        messageFromAKMC: data.get("messageFromAKMC"),
        vision: data.get("vision"),
        mission: data.get("mission"),
        values: data.get("values"),
      },
      "ar-BH": {
        aboutUs: data.get("aboutUs_ar"),
        messageFromFounder: data.get("messageFromFounder_ar"),
        featurePoints: data.get("featurePoints_ar"),
        quote: data.get("quote_ar"),
        messageFromAKMC: data.get("messageFromAKMC_ar"),
        vision: data.get("vision_ar"),
        mission: data.get("mission_ar"),
        values: data.get("values_ar"),
      },
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/aboutUs`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: aboutUsData,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("About Us Added!", res);
        getAboutUsPageData();
        event.target.reset();
      })
      .catch((err) => console.log(err));
  };

  // CREATE Goals
  const addGoals = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const goalsData = {
      "en-US": {
        goalTitle: data.get("goalTitle"),
        goalDescription: data.get("goalDescription"),
      },
      "ar-BH": {
        goalTitle: data.get("goalTitle_ar"),
        goalDescription: data.get("goalDescription_ar"),
      },
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/goals`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: goalsData,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("Goals Added!", res);
        getAboutUsPageData();
        event.target.reset();
      })
      .catch((err) => console.log(err));
  };

  // DELETE Goal
  const handleGoalDelete = async (goalId) => {
    let text = "Are you sure, Want to Delete the Fitness?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/goals/${goalId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          getAboutUsPageData();
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          console.log("Goals Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  // CREATE Patient Rights
  const addPatientRights = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const patientRightsData = {
      "en-US": {
        patientsRightsTitle: data.get("patientsRightTitle"),
        patientsRightsDescription: data.get("patientsRightsDescription"),
      },
      "ar-BH": {
        patientsRightsTitle: data.get("patientsRightTitle_ar"),
        patientsRightsDescription: data.get("patientsRightsDescription_ar"),
      },
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/patientrights`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: patientRightsData,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("Patient Rights Added!", res);
        getAboutUsPageData();
        event.target.reset();
      })
      .catch((err) => console.log(err));
  };

  // DELETE Patient Rights
  const handlePatientRightsDelete = async (patientRightsId) => {
    let text = "Are you sure, Want to Delete the Fitness?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/patientrights/${patientRightsId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          getAboutUsPageData();
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          console.log("Patient rights Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getAboutUsPageData();
  }, []);

  const handleAboutUsChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1>About Us Page</h1>

      <form onSubmit={addAboutUs}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={9}>
            {/* Main Section - About Us */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Main Section - About Us</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="About Us"
                      name="aboutUs"
                      size="small"
                      multiline
                      minRows={10}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["en-US"].aboutUs
                          : null
                      }
                      helperText="Use \n for new line and \t for tab space"
                      sx={{ mb: "2rem" }}
                    />
                    <TextField
                      label="About Us - Arabic"
                      name="aboutUs_ar"
                      size="small"
                      multiline
                      minRows={10}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["ar-BH"].aboutUs
                          : null
                      }
                      helperText="Use \n for new line and \t for tab space"
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Message from founder */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Message from Founder</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="Message from Founder"
                      name="messageFromFounder"
                      size="small"
                      multiline
                      minRows={6}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["en-US"].messageFromFounder
                          : null
                      }
                      helperText="Use \n for new line and \t for tab space"
                      sx={{ mb: "2rem" }}
                    />
                    <TextField
                      label="Message from Founder - Arabic"
                      name="messageFromFounder_ar"
                      size="small"
                      multiline
                      minRows={6}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["ar-BH"].messageFromFounder
                          : null
                      }
                      helperText="Use \n for new line and \t for tab space"
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Feature Points */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Feature Points</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="Feature Points"
                      name="featurePoints"
                      size="small"
                      multiline
                      minRows={4}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["en-US"].featurePoints
                          : null
                      }
                      helperText="Use \n for new line and \t for tab space"
                      sx={{ mb: "2rem" }}
                    />
                    <TextField
                      label="Feature Points - Arabic"
                      name="featurePoints_ar"
                      size="small"
                      multiline
                      minRows={4}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["ar-BH"].featurePoints
                          : null
                      }
                      helperText="Use \n for new line and \t for tab space"
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* AKMC Quote */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">AKMC Quote</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="Quote"
                      name="quote"
                      size="small"
                      multiline
                      minRows={3}
                      defaultValue={
                        aboutUsPageData ? aboutUsPageData["en-US"].quote : null
                      }
                      sx={{ mb: "2rem" }}
                    />
                    <TextField
                      label="Quote - Arabic"
                      name="quote_ar"
                      size="small"
                      multiline
                      minRows={3}
                      defaultValue={
                        aboutUsPageData ? aboutUsPageData["ar-BH"].quote : null
                      }
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Message from AKMC */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Message from AKMC</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="Message from AKMC"
                      name="messageFromAKMC"
                      size="small"
                      multiline
                      minRows={5}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["en-US"].messageFromAKMC
                          : null
                      }
                      sx={{ mb: "2rem" }}
                    />
                    <TextField
                      label="Message from AKMC - Arabic"
                      name="messageFromAKMC_ar"
                      size="small"
                      multiline
                      minRows={5}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["ar-BH"].messageFromAKMC
                          : null
                      }
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Vision & Mission */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Vision &amp; Mission</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="Vision"
                      name="vision"
                      size="small"
                      multiline
                      minRows={2}
                      sx={{ mb: 2 }}
                      defaultValue={
                        aboutUsPageData ? aboutUsPageData["en-US"].vision : null
                      }
                    />
                    <TextField
                      label="Vision - Arabic"
                      name="vision_ar"
                      size="small"
                      multiline
                      minRows={2}
                      sx={{ mb: 2 }}
                      defaultValue={
                        aboutUsPageData ? aboutUsPageData["ar-BH"].vision : null
                      }
                    />
                    <TextField
                      label="Mission"
                      name="mission"
                      size="small"
                      multiline
                      minRows={2}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["en-US"].mission
                          : null
                      }
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Mission - Arabic"
                      name="mission_ar"
                      size="small"
                      multiline
                      minRows={2}
                      defaultValue={
                        aboutUsPageData
                          ? aboutUsPageData["ar-BH"].mission
                          : null
                      }
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Values */}
            <Accordion defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">Values</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid>
                  <FormGroup>
                    <TextField
                      label="Values"
                      name="values"
                      size="small"
                      multiline
                      minRows={2}
                      defaultValue={
                        aboutUsPageData ? aboutUsPageData["en-US"].values : null
                      }
                      sx={{ mb: "2rem" }}
                    />
                    <TextField
                      label="Values - Arabic"
                      name="values_ar"
                      size="small"
                      multiline
                      minRows={2}
                      defaultValue={
                        aboutUsPageData ? aboutUsPageData["ar-BH"].values : null
                      }
                    />
                  </FormGroup>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid xs={12} sm={12} md={3}>
            <Card>
              <CardHeader subheader="Actions" />
              <CardContent></CardContent>
              <CardActions>
                <Button type="submit" variant="contained" disableElevation>
                  Update Page
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </form>

      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={9}>
          {/* Goals */}
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Goals</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                <form onSubmit={addGoals}>
                  <FormGroup>
                    <TextField
                      type="text"
                      name="goalTitle"
                      label="Goal Title"
                      size="small"
                    />
                    <TextField
                      type="text"
                      name="goalTitle_ar"
                      label="Goal Title - Arabic"
                      size="small"
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      label="Goal Description"
                      name="goalDescription"
                      multiline
                      size="small"
                      rows={3}
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      label="Goal Description - Arabic"
                      name="goalDescription_ar"
                      multiline
                      size="small"
                      rows={3}
                      sx={{ mt: 2 }}
                    />
                    <Button type="submit" sx={{ mt: 2 }}>
                      Add Goal
                    </Button>
                  </FormGroup>
                </form>
                <Divider sx={{ my: 1 }} />
                {goalsValues &&
                  goalsValues.map((item, i) => (
                    <div key={i}>
                      <div>
                        <h3>
                          {item["en-US"].goalTitle} | {item["ar-BH"].goalTitle}
                        </h3>
                        <p>{item["en-US"].goalDescription}</p>
                        <p>{item["ar-BH"].goalDescription}</p>
                        <div className="text-right">
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handleGoalDelete(item._id)}
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

          {/* Patients Rights */}
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Patients Rights</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid>
                <form onSubmit={addPatientRights}>
                  <FormGroup>
                    <TextField
                      type="text"
                      name="patientsRightTitle"
                      label="Title"
                      size="small"
                    />
                    <TextField
                      type="text"
                      name="patientsRightTitle_ar"
                      label="Title - Arabic"
                      size="small"
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      label="Description"
                      name="patientsRightsDescription"
                      multiline
                      size="small"
                      rows={4}
                      sx={{ mt: 2 }}
                      helperText="Use \n for new line and \t for tab space"
                    />
                    <TextField
                      label="Description - Arabic"
                      name="patientsRightsDescription_ar"
                      multiline
                      size="small"
                      rows={4}
                      sx={{ mt: 2 }}
                      helperText="Use \n for new line and \t for tab space"
                    />
                    <Button type="submit" sx={{ mt: 2 }}>
                      Add Patient Right
                    </Button>
                  </FormGroup>
                </form>
                <Divider sx={{ my: 1 }} />
                {patientRightsValues &&
                  patientRightsValues.map((item, i) => (
                    <div key={i}>
                      <div>
                        <h3>{item["en-US"].patientsRightsTitle}</h3>
                        <h3>{item["ar-BH"].patientsRightsTitle}</h3>
                        <p>{item["en-US"].patientsRightsDescription}</p>
                        <p>{item["ar-BH"].patientsRightsDescription}</p>
                        <div className="text-right">
                          <Button
                            size="small"
                            color="error"
                            onClick={() => handlePatientRightsDelete(item._id)}
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

        <Grid xs={12} sm={12} md={3}></Grid>
      </Grid>
    </>
  );
};

export default AboutUs;
