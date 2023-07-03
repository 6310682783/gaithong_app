import { useState, forwardRef, useEffect } from "react";
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
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as reminderActions from "../../redux/actions/reminder.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import Swal from "sweetalert2";
import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import thLocale from 'date-fns/locale/th'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

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
  const { data, isFetching } = useSelector((state) => state.reminderReducer);

  useEffect(() => {
    dispatch(reminderActions.loadReminderById(id));
  }, [dispatch, id]);
  const handleClickAlert = () => {
    setOpenAlert(true);
  };
  const handleDelete = () => {
    Swal.fire({
      //title: "Are you sure?",
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
            }, 2000);
          } else {
            setMessageAlert("Something wrong");
            setSeverity("error");
            handleClickAlert();
          }
        });
      }
    });
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const validationSchema = Yup.object().shape({
    //input remindDate time ?
    RemindDate: Yup.date().required("Please type a RemindDate"),
    RemindTime: Yup.string().required("Please type a RemindTime"),
    CreateBy: Yup.string().required("Please type a CreateBy"),
    CreateDate: Yup.string().required("Please type a CreateDate"),
    Description: Yup.string().required("Please type a Description"),
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
          formData.append("RemindDate", values?.RemindDate);
          formData.append("RemindTime", values?.RemindTime);
          formData.append("CreateBy", values?.CreateBy);
          formData.append("CreateDate", values?.CreateDate);
          formData.append("Description", values?.Description);
          dispatch(reminderActions.editReminder(formData)).then((res) => {
            console.log(res);
            if (res && res.isSuccess) {
              setMessageAlert("Update Successfull");
              setSeverity("success");
              handleClickAlert();
              setTimeout(function () {
                handleCloseAlert();
                navigate("/Reminder");
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
          const { values, touched, errors, handleChange, handleSubmit } = props;
          const today = dayjs().add(0, 'day');
          return (
            <Form>
              <Card sx={{ maxWidth: 300, justifyContent: "center" }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} locale={thLocale}>
                        <DemoContainer components={['DateField']}>
                        <DateField label="RemindDate *" />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item md={12} xs={12}>
                    <DemoItem label="RemindTime *">
                      <DateTimePicker
                        defaultValue={today}
                        disableFuture
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                      />
                    </DemoItem>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="CreateBy"
                        label="CreateBy *"
                        value={values?.CreateBy || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                    <LocalizationProvider LocalizationProvider dateAdapter={AdapterDayjs} locale={thLocale}>
                        <DateTimeField defaultValue={today} disableFuture label="CreateDate *" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="Description"
                        label="Description"
                        value={values?.Description || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <LoadingButton onClick={handleSubmit} variant="outlined">
                    <span>Submit</span>
                  </LoadingButton>
                  <Button onClick={handleDelete} variant="outlined">
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
