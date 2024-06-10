import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Jobs() {
  const [JobListArray, setJobListArray] = useState([]);

  useEffect(() => {
    async function FetchAllJobs() {
      const JobList = await axios.get(
        "http://localhost:4000/api/jobRoutes/getAllJobs",
        {
          withCredentials: true, // Ensure credentials are included
        }
      );

      setJobListArray(JobList.data.jobList);
    }
    FetchAllJobs();
  }, []);

  console.log(JobListArray);

  return (
    <div className="mx-[5%] min-h-[60rem] ">
      <p className="text-center text-2xl md:text-5xl">Jobs Available</p>
      <div className="rounded-md flex justify-center items-center flex-wrap p-4 ">
        {JobListArray.map((Job) => {
          return (
            <div
              key={Job._id}
              className="p-4  max-w-[300px] md:max-w-[400px] my-5 mx-2 border rounded-md bg-gray-200"
            >
              <h1 className="inline-flex items-center text-lg font-semibold">
                {Job.JobTitle}
              </h1>
              <p className="mt-3 text-sm max-w-[80%] break-words  text-gray-600">
                {Job.JobDescription}
              </p>
              <div className="mt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  {Job.JobLocation}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  {Job.JobPostedOn}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  {Job.fixedSalary}
                </span>
              </div>
              <Link
              to={`JobDetails/${Job._id}`}
                type="button"
                className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Job Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Jobs;
