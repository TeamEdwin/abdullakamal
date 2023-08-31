import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  FormGroup,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

const CategoryAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const valuedata = {
      "en-US": {
        title: data.get("title"),
        description: data.get("description"),
      },
      "ar-BH": {
        title: data.get("title_ar"),
        description: data.get("description_ar"),
      },
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/categories`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: valuedata,
    };
    console.log(options);
    await Axios(options)
      .then((res) => {
        setLoading(false);
        navigate(`/dashboard/blog/categories`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <h1>Add Category</h1>
      <div>
        <form onSubmit={handleCategorySubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={9}>
              <Card>
                <CardContent>
                  <FormGroup>
                    <TextField
                      label="Name"
                      name="title"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Name - Arabic"
                      name="title_ar"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Description"
                      name="description"
                      size="small"
                      multiline
                      minRows={4}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Description - Arabic"
                      name="description_ar"
                      size="small"
                      multiline
                      minRows={4}
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={12} md={3}>
              <Card>
                <CardHeader subheader="Actions" />
                <CardContent></CardContent>
                <CardActions>
                  <Box sx={{ position: "relative" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      disableElevation
                    >
                      Add Category
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-1rem",
                          marginLeft: "-1.2rem",
                        }}
                      />
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default CategoryAdd;
