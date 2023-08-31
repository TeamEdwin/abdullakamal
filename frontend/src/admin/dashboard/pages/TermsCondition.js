import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Card,
  CardContent,
  FormGroup,
  TextField,
  Button,
  CardHeader,
  CardActions,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

const TermsCondition = () => {
  const [privacyPage, setPrivacyPage] = useState();

  const getPrivacyPage = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/terms`;
    const options = {
      method: "GET",
      url: url,
    };
    await Axios(options).then((res) => {
      setPrivacyPage(res.data.data[0].termsText);
      console.log(res.data);
    });
  };

  const handlePrivacySubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const privacyTextData = data.get("termsText");

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/terms`;
    const options = {
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: { termsText: privacyTextData },
    };
    await Axios(options)
      .then((res) => {
        console.log("Privacy Page Updated!", res);
        getPrivacyPage();
        event.target.reset();
      })
      .catch((err) => {
        console.log("Privacy Page Add error", err);
      });
  };

  useEffect(() => {
    getPrivacyPage();
  }, []);

  return (
    <>
      <h1>Terms & Condition Page</h1>
      <form onSubmit={handlePrivacySubmit}>
        <Grid2 container spacing={2} sx={{ mt: 2, mb: 10 }}>
          <Grid2 xs={12} sm={12} md={9}>
            <Card>
              <CardContent>
                <FormGroup>
                  <TextField
                    label="Terms & Condition Content"
                    name="termsText"
                    multiline
                    size="small"
                    rows={30}
                    defaultValue={privacyPage ? privacyPage : null}
                    // onChange={(event) => event.target.value}
                    helperText="Use \n for new line and \t for tab space"
                    sx={{ mt: 2 }}
                  />
                </FormGroup>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 xs={12} sm={12} md={3}>
            <Card>
              <CardHeader subheader="Actions" />
              <CardContent></CardContent>
              <CardActions>
                <Button type="submit" variant="contained" disableElevation>
                  Update Page
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        </Grid2>
      </form>
    </>
  );
};

export default TermsCondition;
