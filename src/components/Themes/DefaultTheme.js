const themes = {
  typography: {
    fontFamily: ["ntlregular"],
  },
  palette: {
    primary: {
      main: "#2d3436",
      light: "#636e72",
    },
    secondary: {
      main: "##b3e099",
      light: "#81ecec",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#636e72",
          color: "#fff",
          "& .MuiTypography-root": {},
          "& .MuiListItemIcon-root": {
            color: "inherit",
          },
          "& .MuiListItemButton-root.Mui-selected": {
            backgroundColor: "#2d3436",
          },
          "& .MuiListItemButton-root:hover": {
            backgroundColor: "#2d3436",
            "&, & .MuiListItemIcon-root": {
              color: "#fff",
            },
          },
          "& .MuiListItemButton-root.Mui-selected:hover": {
            backgroundColor: "#2d3436",
            "&, & .MuiListItemIcon-root": {
              color: "#fff",
            },
          },
          "& .MuiDivider-root": {
            backgroundColor: "#2d3436",
            opacity: 0.3,
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#90A17D transparent",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: 6,
            height: 6,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 6,
            backgroundColor: "#2d3436",
            minHeight: 24,
            minWidth: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#2d3436",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#2d3436",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#2d3436",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
};
export default themes;
