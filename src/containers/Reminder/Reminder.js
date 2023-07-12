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
import AddIcon from "@mui/icons-material/Add";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import moment from "moment/moment";
import EditIcon from "@mui/icons-material/Edit";

export default function Reminder() {
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

  const { isFetching, result } = useSelector((state) => state.reminderReducer);
  React.useEffect(() => {
    dispatch(reminderActions.loadReminderAll());
  }, [dispatch]);
  console.log(result);
  console.log(isFetching);
  return (
    <Box sx={{ pt: 0.5 }}>
      {!isFetching && result ? (
        <Grid container spacing={3}>
          <Grid item md={10}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  The total number of all reminders : {result?.data?.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={2}>
            <Box sx={{ textAlign: "right" }}>
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
          {result?.data?.map((item, index) => (
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
