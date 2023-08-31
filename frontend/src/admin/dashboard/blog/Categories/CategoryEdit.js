import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export const CategoryEdit = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [categoriesData, setCategoriesData] = useState();
  const [loading, setLoading] = useState(false);

  const getCategoryDataById = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/categories/${categoryId}`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options)
      .then((res) => {
        setCategoriesData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // UPDATE Department handler
  const handleUpdateCategory = async (event) => {
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

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/categories/${categoryId}`;
    const options = {
      method: "PUT",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: valuedata,
    };
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

  const handleCategoryDelete = async (categoryId) => {
    let text = "Are you sure, Want to Delete the Category?";
    if (window.confirm(text) === true) {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/categories/${categoryId}`;
      const options = {
        method: "DELETE",
        url: url,
      };
      await Axios(options)
        .then(() => {
          setLoading(false);
          navigate(`/dashboard/blog/categories`);
          console.log("Deleted Successfully");
        })
        .catch((error) => {
          setLoading(false);
          console.log("Category Delete Error", error);
        });
    } else {
      console.log("You canceled!");
    }
  };

  useEffect(() => {
    getCategoryDataById();
  }, []);

  return (
    <>
      <h1>Edit Category</h1>
      <div className="quill">
        <form onSubmit={handleUpdateCategory}>
          {categoriesData && (
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
                        defaultValue={categoriesData["en-US"].title}
                      />
                      <TextField
                        label="Name - Arabic"
                        name="title_ar"
                        size="small"
                        sx={{ mb: 2 }}
                        defaultValue={categoriesData["ar-BH"].title}
                      />
                      <TextField
                        label="Description"
                        name="description"
                        size="small"
                        multiline
                        minRows={4}
                        defaultValue={categoriesData["en-US"].description}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Description - Arabic"
                        name="description_ar"
                        size="small"
                        multiline
                        defaultValue={categoriesData["ar-BH"].description}
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
                        Update
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
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCategoryDelete(categoriesData._id)}
                      disableElevation
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </>
  );
};

export default CategoryEdit;
