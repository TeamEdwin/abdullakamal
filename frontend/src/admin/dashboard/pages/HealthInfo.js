import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  FormGroup,
  TextField,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Unstable_Grid2";

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
    _id: 35718463,
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

const HealthInfo = () => {
  const [profileImageFile, setProfileImageFile] = useState();
  const [healthInfoPageData, setHealthInfoPageData] = useState();
  const [loading, setLoading] = useState(false);

  // Profile Image Preview
  const [profileData, setProfileData] = useState({ imageUrl: "" });
  const handleProfileImageUpload = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const profileImageUrl = URL.createObjectURL(file);
      setProfileData({ imageUrl: profileImageUrl });
      setProfileImageFile(event.target.files[0]);
    }
  };

  const getHealthInfoData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/health`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setHealthInfoPageData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // CREATE Health Information
  const handleHealthInfoSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const healthInfoValues = {
      healthTitle: data.get("title"),
      description: data.get("description"),
      svgImage: profileImageFile,
    };

    console.log(healthInfoValues);

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/health`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: healthInfoValues,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        console.log("Health Info Added!", res);
        getHealthInfoData();
        event.target.reset();
        if (profileData.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(profileData.imageUrl);
          setProfileImageFile(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // DELETE Health Information
  const handleHealthInfoDelete = async (healthInfoID) => {
    let text = "Are you sure, Want to Delete the Health Information?";
    if (window.confirm(text) === true) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/health/${healthInfoID}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          getHealthInfoData();
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          console.log("Health Infomation Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getHealthInfoData();
    // CleanUp/Revoke Temporary Preview Image from browser created by URL.createdObjectUrl
    return () => {
      if (profileData.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profileData.imageUrl);
      }
    };
  }, [profileData.imageUrl]);

  return (
    <>
      <h1>Health Information Page</h1>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={12} md={9}>
          <Card>
            <CardContent>
              <Grid2>
                <form onSubmit={handleHealthInfoSubmit}>
                  <FormGroup>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        mb: "2rem",
                      }}
                    >
                      {profileImageFile ? (
                        <img
                          src={profileData.imageUrl}
                          alt="Insurance Company"
                          style={{
                            height: 120,
                            marginBottom: "1rem",
                          }}
                        />
                      ) : null}
                      <Button variant="outlined" component="label">
                        Upload Image
                        <input
                          hidden
                          accept=".png"
                          multiple
                          type="file"
                          onChange={handleProfileImageUpload}
                        />
                      </Button>
                    </Box>
                    <TextField
                      type="text"
                      name="title"
                      label="Title"
                      size="small"
                      required
                    />
                    <TextField
                      label="Description"
                      name="description"
                      multiline
                      size="small"
                      rows={5}
                      helperText="Use \n for new line and \t for tab space"
                      sx={{ mt: 2 }}
                      required
                    />
                    <Box sx={{ position: "relative" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ my: 2, minWidth: "100%" }}
                        disabled={loading}
                      >
                        Add Information
                      </Button>
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
                    </Box>
                  </FormGroup>
                </form>
                <Divider sx={{ my: 1 }} />
                {healthInfoPageData &&
                  healthInfoPageData.map((item, i) => (
                    <div key={i}>
                      <Grid container key={i}>
                        <Grid item md={4} sm={12}>
                          <img
                            src={`${item.svgImage}`}
                            style={{ maxHeight: "15rem" }}
                            alt="health"
                          />
                        </Grid>
                        <Grid item md={8} sm={12}>
                          <h3>{item.healthTitle}</h3>
                          <p>{item.description}</p>
                        </Grid>
                      </Grid>
                      <div className="text-right">
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleHealthInfoDelete(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <Divider sx={{ my: 1 }} />
                    </div>
                  ))}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 xs={12} sm={12} md={3}>
          {/* <Card>
            <CardHeader subheader="Actions" />
            <CardContent></CardContent>
            <CardActions>
              <Button variant="contained" disableElevation>
                Update Page
              </Button>
            </CardActions>
          </Card> */}
        </Grid2>
      </Grid2>
    </>
  );
};

export default HealthInfo;
