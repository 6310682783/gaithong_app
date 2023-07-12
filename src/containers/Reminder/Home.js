import { useState, forwardRef, useEffect } from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as reminderActions from "../../redux/actions/reminder.actions";
import * as homeActions from "../../redux/actions/home.actions";
import AddIcon from "@mui/icons-material/Add";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import moment from "moment/moment";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const reminderReducer = useSelector((state) => state.reminderReducer);
  const homeReducer = useSelector((state) => state.homeReducer);
  React.useEffect(() => {
    dispatch(reminderActions.loadReminderFromNow());
    dispatch(homeActions.loadReminderFromNow());
  }, [dispatch]);
  console.log(reminderReducer?.result);
  console.log(reminderReducer?.isFetching);
  console.log(homeReducer?.result);
  console.log(homeReducer?.isFetching);

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <Box sx={{ pt: 0.5 }}>
      {!reminderReducer?.isFetching && reminderReducer?.result ? (
        <Grid container spacing={3}>
          <Grid item md={10}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Today is "{formatDate(new Date())}" Total Reminders:{" "}
                  {homeReducer?.result?.data?.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  navigate("/Reminder/AddReminder");
                }}
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
          </Grid>
          {reminderReducer?.result?.data?.map((item, index) => (
            <Grid key={index} item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={2}>
                      {item?.createBy}
                    </Grid>
                    <Grid item md={2}>
                      {moment(item?.remindDate).format("DD/MM/yyyy")}
                    </Grid>
                    <Grid item md={2}>
                      {moment(item?.remindTime).format("hh:mm")}
                    </Grid>
                    <Grid item md={4}>
                      {item?.description}
                    </Grid>
                    <Grid item md={1}>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <Button
                          sx={{ marginLeft: "auto" }}
                          onClick={() => {
                            navigate(`/Reminder/UpdateReminder/${item?.id}`);
                          }}
                          size="small"
                          variant="outlined"
                          color="info"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        ""
      )}
    </Box>
  );
}
