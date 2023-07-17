import { useState, forwardRef, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as reminderActions from "../../redux/actions/reminder.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";
import Swal from "sweetalert2";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DeleteIcon from "@mui/icons-material/Delete";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EditReminder() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const [error, setError] = useState(null);
  const { data, isFetching } = useSelector((state) => state.reminderReducer);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reminderActions.deleteReminderById(id)).then((res) => {
          console.log(res);
          if (res && res.isSuccess) {
            setMessageAlert("Delete Successfull");
            setSeverity("success");
            handleClickAlert();
            setTimeout(function () {
              handleCloseAlert();
              navigate("/Reminder");
            }, 300);
          } else {
            setMessageAlert("Something wrong");
            setSeverity("error");
            handleClickAlert();
          }
        });
      }
    });
  };

  useEffect(() => {
    dispatch(reminderActions.loadReminderById(id));
  }, [dispatch, id]);
  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date in the first quarter of 2022";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const validationSchema = Yup.object().shape({
    remindDate: Yup.string().required("Please type a remindDate").nullable(),
    remindTime: Yup.string().required("Please type a remindTime").nullable(),
    createBy: Yup.string().required("Please type a createBy").nullable(),
    description: Yup.string().required("Please type a description").nullable(),
  });
  return (
    <Box
      display="flex"
      component="form"
      justifyContent="center"
      alignItems="center"
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
      <Formik
        enableReinitialize
        initialValues={data?.data ? data?.data : {}}
        onSubmit={(values) => {
          console.log(values);
          let formData = new FormData();
          formData.append("id", values?.id);
          formData.append(
            "remindDate",
            moment(values?.remindDate.$d).format("DD/MM/yyyy")
          );
          formData.append(
            "remindTime",
            moment(values?.remindTime.$d).format("HH:mm")
          );
          formData.append("description", values?.description);
          formData.append("createBy", values?.createBy);
          dispatch(reminderActions.editReminder(formData)).then((res) => {
            console.log(res);
            if (res && res.isSuccess) {
              setMessageAlert("Update Successfull");
              setSeverity("success");
              handleClickAlert();
              setTimeout(function () {
                handleCloseAlert();
                navigate("/Home");
              }, 500);
            } else {
              setMessageAlert("Something wrong");
              setSeverity("error");
              handleClickAlert();
            }
          });
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
          } = props;
          return (
            <Form>
              <Card sx={{ maxWidth: 300, justifyContent: "center" }}>
                <CardContent>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="de"
                  >
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12}>
                        <DatePicker
                          id="remindDate"
                          name="remindDate"
                          label="remindDate *"
                          format="DD/MM/YYYY"
                          value={dayjs(values?.remindDate || null)}
                          onChange={(e) => {
                            setFieldValue("remindDate", e);
                          }}
                          error={
                            touched.remindDate && Boolean(errors.remindDate)
                          }
                          slotProps={{
                            textField: {
                              helperText: touched.remindDate
                                ? errors.remindDate
                                : "",
                              error:
                                touched.remindDate &&
                                Boolean(errors.remindDate),
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TimePicker
                          id="remindTime"
                          name="remindTime"
                          label="remindTime *"
                          format="HH:mm"
                          value={moment(values?.remindTime || null)}
                          onChange={(e) => {
                            setFieldValue("remindTime", e);
                          }}
                          error={
                            touched.remindTime && Boolean(errors.remindTime)
                          }
                          slotProps={{
                            textField: {
                              helperText: touched.remindTime
                                ? errors.remindTime
                                : "",
                              error:
                                touched.remindTime &&
                                Boolean(errors.remindTime),
                            },
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="createBy"
                          label="createBy"
                          value={values?.createBy || ""}
                          onChange={handleChange}
                          disabled
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="description"
                          label="description"
                          value={values?.description || ""}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    color="success"
                    startIcon={<HowToRegIcon />}
                  >
                    <span>Submit</span>
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    <span>Delete</span>
                  </Button>
                </CardActions>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
