import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components//Layout/Navbar";
import Footer from "./Components//Layout/Footer";
import NotFound from "./NotFound/NotFound";
import Home from "./Components/Home/Home";
import ApplicationForm from "./Components/Application/ApplicationForm";
import MyApplications from "./Components/Application/MyApplications";
import Jobs from "./Components/Job/Jobs.jsx";
import JobDetails from "./Components/Job/JobDetails.jsx";
import PostJob from "./Components/Job/PostJob.jsx";
import MyJobs from "./Components/Job/MyJobs.jsx";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./Context/AppContext.jsx";
import axios from "axios";
import GetAllExistingUsers from "./Users/GetAllExistingUsers";

function App() {
  const { IsAuthorized, setIsAuthorized, setUser, User } =
    useContext(AppContext);

  useEffect(() => {
    //! 1) Fetching User Details
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/userRoutes/getCurrentUser",
          {
            withCredentials: true,
          }
        );
        console.log("Code is " + response.status);
        // ! If User Not Found Then
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const userResponse = response.data;
        console.log(userResponse);
        //! 2) Setting the user Object to the User variable
        setUser(userResponse.currentUser);
        console.log("users is " + userResponse.currentUser);

        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [setIsAuthorized, setUser]);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/Jobs/JobDetails/:id" element={<JobDetails />} />
          {User.Role === "Job Manager" ? (
            <Route path="/PostJob" element={<PostJob />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}

          {User.Role === "Job Manager" ? (
            <Route path="/MyJobs/me" element={<MyJobs />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}

          {User.Role === "Job Seeker" ? (
            <Route path="/ApplicationForm/:id" element={<ApplicationForm />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          <Route path="/MyApplications/me" element={<MyApplications />} />

          {User.Role === "Job Manager" ? (
            <Route
              path="/GetAllExistingUsers"
              element={<GetAllExistingUsers />}
            />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer></Footer>
        <Toaster></Toaster>
      </Router>
    </>
  );
}

export default App;
