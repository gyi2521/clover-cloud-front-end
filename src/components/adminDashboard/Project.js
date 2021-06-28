import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogForm from "./DialogForm_Proj";
import EditIcon from "@material-ui/icons/Edit";
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      align: "center",
    },
  },
  table: {
    minWidth: "400px",
  },
  tableContainer: {
    width: "70%",
  },
  //   div: {
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "center",
  //   },
}));

const DisplayTable = ({ updateTableDataView }) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [updatedDB, setUpdatedDB] = useState(new Date());
  const [projectList, setProjectList] = useState([]);
  const [selectedObject, setSelectedObject] = useState({});
  const [newProject, setNewProject] = useState({
    title: "",
    hrsPlanned: "",
    status: "Active",
  });

  const [dialogFormOpen, setDialogFormOpen] = useState(false);
  const [dialogMethod, setDialogMethod] = useState("");

  let employeeId = 2;
  const getUserData = (employeeId) => {
    axios
      .get(`/log/employee/${employeeId}`)
      .then((res) => {
        const tableData = res.data;
        console.log(tableData);
        const tempData = [];
        tableData.forEach((doc) => {
          tempData.push({
            id: doc.logId,
            Project: doc.projectName,
            Category: doc.categoryName,
            Employee: doc.firstName,
            Date: doc.timestamp,
            TimeSpent: convertToHours(doc.timeSpent),
          });
        });
        setTableData(tempData);
      })
      .catch((err) => console.log("There is no data!"));
  };

  const handleDialogFormOpen = (obj, method) => {
    setDialogMethod(method);
    setSelectedObject(obj);
    setDialogFormOpen(true);
  };

  useEffect(() => {
    if (employeeId) {
      getUserData(employeeId);
    } else {
      console.log("No current user!");
    }
  }, []);

  const convertToHours = (num) => {
    let hrsMin = num / 60;
    let hrs = Math.floor(hrsMin);
    let min = Math.round((hrsMin - hrs) * 60);
    return min === 0 ? `${hrs} hrs` : `${hrs} hrs ${min} min`;
  };
  return (
    <Fragment>
      <Table className={classes.table}>
        <TableHead style={{ backgroundColor: "#eee" }}>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Project</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date/Time</TableCell>
            <TableCell>TimeSpent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((obj) => (
            <TableRow key={obj.id}>
              <TableCell>{obj.Employee}</TableCell>
              <TableCell component="th" scope="row">
                {obj.Project}
              </TableCell>
              <TableCell>{obj.Category}</TableCell>
              <TableCell>{obj.Date}</TableCell>
              <TableCell>{obj.TimeSpent}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <br />
        <br />
        <div className={classes.root.align}>
          <Button
            variant="contained"
            onClick={() => handleDialogFormOpen({}, "New")}
          >
            Add Project
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDialogFormOpen({}, "Edit")}
          >
            Edit Project
          </Button>
        </div>
      </Table>

      <DialogForm
        dialogMethod={dialogMethod}
        dialogFormOpen={dialogFormOpen}
        setDialogFormOpen={setDialogFormOpen}
        selectedObject={selectedObject}
        // onProjectSave={handleProjectSave}
        // onProjectChange={handleProjectChange}
      />
    </Fragment>
  );
};

export default DisplayTable;
