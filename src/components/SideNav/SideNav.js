import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Toolbar, IconButton, Divider, List } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Route, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

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

export default function SideNav(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRouted, setselectedRouted] = React.useState(location.pathname);
  const { toggleDrawer, open } = props;
  const handleListItemClick = (event, route) => {
    event.preventDefault();
    setselectedRouted(route);
    navigate(route);
  };
  return (
    <Drawer variant="permanent" open={open}>
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
      <List component="nav" sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <ListItemButton
          sx={{ borderRadius: "16px", marginBottom: 0.25 }}
          onClick={(event) => handleListItemClick(event, "/Home")}
          selected={selectedRouted === "/Home" || selectedRouted === "/"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          sx={{ borderRadius: "16px", marginBottom: 0.25 }}
          onClick={(event) => handleListItemClick(event, "/Reminder")}
          selected={selectedRouted === "/Reminder"}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Reminder" />
        </ListItemButton>

        <ListItemButton
          sx={{ borderRadius: "16px", marginBottom: 0.25 }}
          onClick={(event) => handleListItemClick(event, "/")}
          selected={selectedRouted === "/Customers"}
          disabled={true}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>

        <ListItemButton
          sx={{ borderRadius: "16px", marginBottom: 0.25 }}
          onClick={(event) => handleListItemClick(event, "/")}
          selected={selectedRouted === "/Reports"}
          disabled={true}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>

        <ListItemButton
          sx={{ borderRadius: "16px", marginBottom: 0.25 }}
          onClick={(event) => handleListItemClick(event, "/")}
          selected={selectedRouted === "/Intrgations"}
          disabled={true}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
      </List>
    </Drawer>
  );
}
