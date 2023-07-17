import { useState, forwardRef, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, Card, CardContent, CardActions, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as reminderActions from "../../redux/actions/reminder.actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import moment from "moment/moment";
import 'dayjs/locale/de';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddReminder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("");
  const [error, setError] = useState(null);

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

  const handleClickAlert = () => {
    setOpenAlert(true);
  };
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
        initialValues={{
          remindDate: "",
          remindTime: "",
          createBy: "",
          description: "",
        }}
        onSubmit={(values) => {
          console.log("value ", values);
          let formData = new FormData();
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
          dispatch(reminderActions.addReminder(formData)).then((res) => {
            console.log(res);
            if (res && res.isSuccess) {
              setMessageAlert("Add Successfull");
              setSeverity("success");
              handleClickAlert();
              setTimeout(function () {
                handleCloseAlert();
                navigate("/Home");
              }, 2000);
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
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12}>
                        <DatePicker
                          id="remindDate"
                          name="remindDate"
                          label="remindDate *"
                          format="DD/MM/YYYY"
                          // value={values?.remindDate}
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
                <CardActions>
                  <LoadingButton onClick={handleSubmit} variant="outlined">
                    <span>Submit</span>
                  </LoadingButton>
                </CardActions>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
