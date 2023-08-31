import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Divider, ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import WebIcon from "@mui/icons-material/Web";
import AppsIcon from "@mui/icons-material/Apps";

const PagesAll = () => {
  return (
    <>
      <h1>Pages</h1>
      <Card>
        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="home" disableRipple>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="aboutus" disableRipple>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="healthinfo"
                disableRipple
              >
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="Health Information" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="contactus"
                disableRipple
              >
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="insuranceprovider"
                disableRipple
              >
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary="Insurance Providers" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="privacy" disableRipple>
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="termscondition"
                disableRipple
              >
                <ListItemIcon>
                  <WebIcon />
                </ListItemIcon>
                <ListItemText primary="Terms & Conditions" />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default PagesAll;
