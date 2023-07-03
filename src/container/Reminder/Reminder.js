import * as React from "react";
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
import { Navigate, useNavigate } from "react-router-dom";


export default function Reminder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Grid item md={12}>
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
            <Grid key={index} item xs={12} md={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item?.CreateBy}
                  </Typography>
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
