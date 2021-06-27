import React, { Fragment } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  TextField: {
    width: "90%",
    textAlign: "left",
  },
  InputLabel: {
    textAlign: "left",
  },
});

const TimeLog = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      {/* <InputLabel className={classes.InputLabel}>Time Spent: </InputLabel> */}
      <FormControl>
        <TextField
          onChange={props.onHoursSet}
          className={classes.TextField}
          type="number"
          value={props.hoursValue}
        />
        <FormHelperText>Enter hours spent</FormHelperText>
      </FormControl>
      <FormControl>
        <Select
          native
          id="minLookUp"
          label="Min"
          onChange={props.onMinsSet}
          value={props.minsValue}
          //value={props.minsValue}
          //input={<BootstrapInput />}
        >
          <option value={0}>0</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={45}>45</option>
        </Select>
        <FormHelperText>Select minutes spent</FormHelperText>
      </FormControl>
    </Fragment>
  );
};

export default TimeLog;
