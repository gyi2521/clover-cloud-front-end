import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeLog from "./TimeLog";
import { Button, TextField, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ProjectTimeLog = ({ updateTableDataView }) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [enteredHours, setEnteredHours] = useState(0);
  const [enteredMins, setEnteredMins] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHoursSet = (event) => {
    setEnteredHours(event.target.value);
    console.log(event.target.value);
  };

  const handleMinutesSet = (event) => {
    setEnteredMins(event.target.value);
    console.log(event.target.value);
  };
  //Add Project Log
  const handleProjectLogAdd = (event) => {
    event.preventDefault();

    axios
      .post("/log", {
        projectId: selectedProjectId,
        categoryName: selectedCategory,
        employeeId: 2,
        timestamp: selectedDate,
        timeSpent: calTimeSpent(),
      })

      .then((result) => {
        console.log(result.data);
        setSelectedCategory("");
        setSelectedProject("");
        setEnteredHours(0);
        setEnteredMins(0);
        updateTableDataView("working!");
      })
      .catch((err) => console.log("something went wrong client side:", err));
  };

  const calTimeSpent = () =>
    parseInt(enteredHours * 60) + parseInt(enteredMins);

  //get data for project lookup
  const projectList = [];
  useEffect(() => {
    axios
      .get("/project")

      .then((result) => {
        console.log(result.data);
        result.data.forEach((data) => {
          if (data.projectStatus === "Active") {
            projectList.push({
              id: data.projectId,
              title: data.projectName,
            });
          }
        });
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  }, [projectList]);

  //get data for categories lookup

  const categoryList = [
    { id: 1, title: "Information Gathering" },
    { id: 2, title: "Research & Analysis" },
    { id: 3, title: "Planning" },
    { id: 4, title: "Design" },
    { id: 5, title: "Development" },
    { id: 6, title: "Testing" },
    { id: 7, title: "Deployment" },
  ];

  return (
    <form onSubmit={handleProjectLogAdd}>
      <Typography variant="h6" color="textSecondary">
        Project Time Log
      </Typography>
      <br />
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date"
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <br />
      <Autocomplete
        id="projectLookup"
        clearOnEscape
        options={projectList}
        getOptionLabel={(option) => option.title}
        getOptionSelected={(option, value) => option.id === value.id} // added this props to resolve error--Material-UI: The value provided to Autocomplete is invalid.
        inputValue={selectedProject}
        onChange={(event, value) => {
          setSelectedProject(value.title);
          setSelectedProjectId(value.id);
          console.log(value.title);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Project" margin="normal" />
        )}
      />

      <Autocomplete
        id="categoryLookup"
        clearOnEscape
        options={categoryList}
        getOptionLabel={(option) => option.title}
        getOptionSelected={(option, value) => option.id === value.id} // added this props to resolve error--Material-UI: The value provided to Autocomplete is invalid.
        inputValue={selectedCategory}
        onChange={(event, value) => {
          setSelectedCategory(value.title);
          console.log(value.title);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Category" margin="normal" />
        )}
      />
      <br />
      <TimeLog
        onHoursSet={handleHoursSet}
        hoursValue={enteredHours}
        minsValue={enteredMins}
        onMinsSet={handleMinutesSet}
      />
      <br />
      <br />
      <br />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
};
export default ProjectTimeLog;
