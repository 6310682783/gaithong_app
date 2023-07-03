import { Typography } from "@mui/material";

function Copyright(props) {
  return (
    <footer className="app-footer">
      <span className="d-inline-block">Copyright &copy; 2022</span>
      <Typography size="small" color="primary">
        V 1.0.0
      </Typography>
    </footer>
  );
}

export default function Footer() {
  return <Copyright />;
}
