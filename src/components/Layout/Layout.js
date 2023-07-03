import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Header from "../Header/Header";
import { createTheme, ThemeProvider } from "@mui/material";
import SideNav from "../SideNav/SideNav";
import "../../assets/Style";
import ThemeCustom from "../Themes/DefaultTheme";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const defaultTheme = createTheme(ThemeCustom);

export default function Layout() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header toggleDrawer={toggleDrawer} open={open} />
        <SideNav toggleDrawer={toggleDrawer} open={open} />
        <Box
          component="main"
          sx={{
            backgroundImage: `url("https://wallpapercave.com/wp/wp10712591.jpg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container
            maxWidth={false}
            sx={{
              mt: 4,
              mb: 4,
              minHeight:
                "calc(100vh - calc(5.5rem + 1px) - calc(5.5rem + 1px))",
            }}
          >
            <Outlet />
          </Container>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
