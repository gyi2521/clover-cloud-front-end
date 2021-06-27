import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ProjectTimeLog from "../components/projectTimeLog/ProjectTimeLog";
import DisplayTable from "../components/employeeLogTable/EmployeeLogTable";

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

export default function EmployeeDashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}></Grid>

        <Grid item xs={4}>
          <Paper variant="outlined" square={false} className={classes.paper}>
            <ProjectTimeLog />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper variant="outlined" className={classes.paper}>
            <DisplayTable />
          </Paper>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}
