import React from "react";
import axios from "axios";
import "./App.css";
import Home from "./page/Home";
import EmployeeDashboard from "./page/EmployeeDashboard";
import AdminDashboard from "./page/AdminDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

axios.defaults.baseURL = "http://localhost:8143/";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/employee" component={EmployeeDashboard} />
          <Route path="/admin" component={AdminDashboard} />
        </Switch>
      </Router>
    </div>
    // <div className="App">
    //   <AdminDashboard />
    //   <EmployeeDashboard />
    // </div>
  );
}

export default App;
