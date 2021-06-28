import React, { useState } from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DisplayTable from "../components/adminDashboard/Project";
import ClientLogo from "../images/techtab-logo.png";
//import DisplayTable from "../components/employeeLogTable/EmployeeLogTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 600,
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function AdminDashboard() {
  const classes = useStyles();

  const [refreshPage, setRefreshPage] = useState(new Date());

  const handleUpdateTableDataView = (msg) => {
    console.log(msg);
    window.location.reload();
    //setRefreshPage(new Date());
  };

  // useEffect(() => {
  //   setRefreshPage(new Date());
  // }, [refreshPage]);

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          {/* <img src={ClientLogo} className="App-logo-sm" alt="logo" /> */}
          <br />
          <br />
          <Typography variant="h4" color="textPrimary" align="center">
            Admin Dashboard
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" square={false} className={classes.paper}>
            <DisplayTable />
          </Paper>
        </Grid>
        {/* <Grid item xs={8}>
          <Paper variant="outlined" className={classes.paper}>
            <DisplayTable updateTableDataView={handleUpdateTableDataView} />
          </Paper>
        </Grid> */}
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}
