import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

function JobDetailsValues() {
  const [JobDetails, setJobDetails] = useState();
  const Navigate = useNavigate();
  const { id } = useParams();

  // ! Function To get All  The Job Details FRom The DB
  async function FetchDetails() {
    try {
      const Response = await axios.get(
        `http://localhost:4000/api/jobRoutes/FindJobByID/${id}`,
        {
          withCredentials: true, // Ensure credentials are included
        }
      );

      setJobDetails(Response.data.message);
      console.log(Response);
      console.log(JobDetails.JobTitle);
    } catch (error) {
      console.log(error);
    }
  }

  const { User } = useContext(AppContext);

  useEffect(() => {
    FetchDetails();
  }, [id]);

  function handleApplyNowButton() {
    console.log("Hii");
    Navigate(`/ApplicationForm/${JobDetails._id}`);
  }

  return (
    <div>
      <p className="text-center text-2xl md:text-5xl">Jobs Description</p>
      {JobDetails && (
        <div className="flow-root min-h-[50rem] overflow-scroll rounded-lg border break-words h-screen p-10  border-gray-100 py-3 shadow-sm">
          <dl className="-my-3 bg-purple-200 mt-7 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Job Title</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {JobDetails.JobTitle}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name</dt>
              <dd className="text-gray-700 sm:col-span-2">John Frusciante</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Job Location</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {JobDetails.JobLocation}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Salary</dt>
              <dd className="text-gray-700 sm:col-span-2">
                ${JobDetails.fixedSalary}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900"> Job Posted On</dt>
              <dd className="text-gray-700 sm:col-span-2">
                ${JobDetails.JobPostedOn}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Bio</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {JobDetails.JobDescription}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">JobCategory</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {JobDetails.JobCategory}
              </dd>
            </div>
          </dl>
          {User.Role === "Job Seeker" && (
            <button
              onClick={handleApplyNowButton}
              className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] mt-5 hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
            >
              Apply Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default JobDetailsValues;
