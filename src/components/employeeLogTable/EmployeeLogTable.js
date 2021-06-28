import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "400px",
  },
  tableContainer: {
    width: "70%",
  },
}));

const DisplayTable = ({ updateTableDataView }) => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [updatedDB, setUpdatedDB] = useState(new Date());

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

            Date: doc.timestamp,
            TimeSpent: convertToHours(doc.timeSpent),
          });
        });
        setTableData(tempData);
      })
      .catch((err) => console.log("There is no data!"));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/log/${id}`)
      // db.collection('projects').doc(selectedObject.id).delete()
      .then((res) => {
        console.log(res);
        setUpdatedDB(new Date());
        updateTableDataView("deleted!");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (employeeId) {
      getUserData(employeeId);
    } else {
      console.log("No current user!");
    }
  }, []);

  const convertDate = (date) => {
    let displayDate = new Date(date);
    // let mm = displayDate.getMonth() + 1;
    // let dd = displayDate.getDate();
    // let yyyy = displayDate.getFullYear();
    // let tt = displayDate.toLocaleTimeString();
    // if (mm < 10) {
    //   mm = `0${mm}`;
    // }
    // if (dd < 10) {
    //   dd = `0${dd}`;
    // }
    // return (displayDate = `${mm}/${dd}/${yyyy}@${tt}`);
    return displayDate.getUTCHours();
  };

  const convertToHours = (num) => {
    let hrsMin = num / 60;
    let hrs = Math.floor(hrsMin);
    let min = Math.round((hrsMin - hrs) * 60);
    return min === 0 ? `${hrs} hrs` : `${hrs} hrs ${min} min`;
  };
  return (
    <Table className={classes.table}>
      <TableHead style={{ backgroundColor: "#eee" }}>
        <TableRow>
          <TableCell>Project</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>TimeSpent</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((obj) => (
          <TableRow key={obj.id}>
            <TableCell component="th" scope="row">
              {obj.Project}
            </TableCell>
            <TableCell>{obj.Category}</TableCell>
            <TableCell>{obj.Date}</TableCell>
            <TableCell>{obj.TimeSpent}</TableCell>
            <IconButton id="edit" onClick={() => handleDelete(obj.id)}>
              <DeleteIcon />
            </IconButton>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DisplayTable;
