import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  Button,
  InputLabel,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const projectList = [];
const DialogForm = (props) => {
  console.log(props.dialogMethod, props.selectedObject);
  const [selectedObject, setSelectedObject] = useState({});
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState();
  //const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    hrsPlanned: "",
    status: "Active",
  });

  const handleProjectChange = (event, id) => {
    if (!id) {
      setNewProject({
        ...newProject,
        [event.target.name]: event.target.value,
      });
    } else {
      setSelectedObject({
        ...selectedObject,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleProjectSave = (event) => {
    event.preventDefault();
    if (Object.keys(selectedProject).length !== 0) {
      console.log(selectedProject, selectedProjectId);
      axios
        .put(`/project/${selectedProjectId}`, selectedObject)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));
    } else {
      console.log(newProject);
      axios
        .post("/project", newProject)
        .then((result) => {
          // setUpdatedDB(new Date());
          console.log(result);
          setNewProject({ title: "", hrsPlanned: "", status: "Active" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    props.setDialogFormOpen(false);
  };

  //get data for project lookup
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
              hrsPlanned: data.hoursPlanned,
              status: data.projectStatus,
            });
          }
        });
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  }, []);

  if (props.dialogMethod === "New") {
    return (
      <Dialog
        open={props.dialogFormOpen}
        onClose={() => props.setDialogFormOpen(false)}
      >
        <form onSubmit={handleProjectSave}>
          <DialogTitle>Add project</DialogTitle>
          <DialogContent>
            <br />
            <TextField
              type="text"
              name="projectName"
              label="Project Name"
              required
              autoFocus
              fullWidth
              defaultValue={""}
              onChange={(e) => handleProjectChange(e)}
            />
            <TextField
              type="number"
              name="hoursPlanned"
              label="Project Hours"
              defaultValue={""}
              onChange={(e) => handleProjectChange(e)}
            />
            <br />
            <br />
            <InputLabel shrink>Status</InputLabel>
            <Select
              native
              defaultValue={""}
              id="statusLookUp"
              name="projectStatus"
              onChange={(e) => handleProjectChange(e)}
            >
              <option value={""}></option>
              <option value={"Active"}>Active</option>
              <option value={"Pending"}>Pending</option>
              <option value={"Completed"}>Completed</option>
            </Select>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
            <Button onClick={() => props.setDialogFormOpen(false)}>
              {" "}
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        open={props.dialogFormOpen}
        onClose={() => props.setDialogFormOpen(false)}
      >
        <form onSubmit={handleProjectSave}>
          <DialogTitle>Edit project</DialogTitle>
          <DialogContent>
            <br />
            <Autocomplete
              id="projectLookup"
              clearOnEscape
              options={projectList}
              getOptionLabel={(option) => option.title}
              getOptionSelected={(option, value) => option.id === value.id} // added this props to resolve error--Material-UI: The value provided to Autocomplete is invalid.
              inputValue={selectedProject}
              onChange={(event, value) => {
                setSelectedProjectId(value.id);
                setSelectedProject(value.title);
                console.log(value.title, value.id);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Project" margin="normal" />
              )}
            />
            <TextField
              type="number"
              name="hoursPlanned"
              label="Project Hours"
              defaultValue={projectList.hrsPlanned}
              onChange={(e) => handleProjectChange(e)}
            />
            <br />
            <br />
            <InputLabel shrink>Status</InputLabel>
            <Select
              native
              defaultValue={projectList.status}
              id="statusLookUp"
              name="projectStatus"
              onChange={(e) => handleProjectChange(e)}
            >
              <option value={""}></option>
              <option value={"Active"}>Active</option>
              <option value={"Pending"}>Pending</option>
              <option value={"Completed"}>Completed</option>
            </Select>
            <br />
            <br />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save</Button>
            <Button onClick={() => props.setDialogFormOpen(false)}>
              {" "}
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
};

export default DialogForm;
