import { useState, useEffect } from "react";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import GroupIcon from "@mui/icons-material/Group";
import ListIcon from "@mui/icons-material/List";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsIcon from "@mui/icons-material/Collections";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { signout } from "../../../context/helpers";
import ar_logo from "../../../assets/ar.jpg";

import { ReactComponent as FlagBH } from "../../../assets/icons/bh.svg";
import { ReactComponent as FlagUS } from "../../../assets/icons/us.svg";

import { useTranslation } from "react-i18next";
import i18n from "../../../helpers/i18n";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Header() {
  const history = useNavigate();

  const { t } = useTranslation();
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";

  const [openDrawer, setOpenDrawer] = useState(true);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    signout(() => history("/adminlogin"));
  };

  useEffect(() => {}, [currentLanguageCode]);

  return (
    <>
      <AppBar position="absolute" open={openDrawer}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(openDrawer && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Button color="inherit" component={RouterLink} to="/" target="_blank">
            Main Website
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawer}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* <ListItemButton component={RouterLink} to="" disableRipple>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard | لوحة القيادة" />
          </ListItemButton> */}

          <ListItemButton component={RouterLink} to="doctor" disableRipple>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Doctors | الأطباء" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="packages" disableRipple>
            <ListItemIcon>
              <MedicalServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Packages | رزمة" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="department" disableRipple>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Departments | الإدارات" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton component={RouterLink} to="purchases" disableRipple>
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Purchases | صفقة" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="contacts" disableRipple>
            <ListItemIcon>
              <PrivacyTipIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts | جهات الاتصال" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton onClick={handleClick} disableRipple>
            <ListItemIcon>
              <LocalPostOfficeIcon />
            </ListItemIcon>
            <ListItemText primary="Blog Posts | مقالات" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" dense={true} disablePadding>
              <ListItemButton
                component={RouterLink}
                to="blog"
                sx={{ pl: 4 }}
                disableRipple
              >
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="All Posts | المشاركات" />
              </ListItemButton>
              <ListItemButton
                component={RouterLink}
                to="blog/categories"
                sx={{ pl: 4 }}
                disableRipple
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories | فئات" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton component={RouterLink} to="pages" disableRipple>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Pages | الصفحات" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="gallery" disableRipple>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Gallery | صالة عرض" />
          </ListItemButton>

          <ListItemButton component={RouterLink} to="users" disableRipple>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users | المستخدمون" />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="profile" disableRipple>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile | الملف الشخصي" />
          </ListItemButton>

          <Divider sx={{ my: 1 }} />

          <ListItemButton component="li" onClick={handleSignOut} disableRipple>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout | تسجيل خروج" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
