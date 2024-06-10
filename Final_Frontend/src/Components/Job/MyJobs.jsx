import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
function MyJobs() {
  const [MyJobsList, setMyJobsList] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    async function FetchMyJobs() {
      try {
        const Response = await axios.get(
          "http://localhost:4000/api/jobRoutes/getMyJobs",
          {
            withCredentials: true, // Ensure credentials are included
          }
        );

        if (Response.status === 200) {
          setMyJobsList(Response.data.MyJobsList);
          console.log(MyJobsList);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    FetchMyJobs();
  }, []);

  return (
    <>
      <p className="text-4xl text-center mt-4">Jobs Posted By Me Are</p>
      <div className="flex min-h-[50rem] md:min-h-[0rem]  justify-center items-center mt-3 flex-wrap">
        {MyJobsList.length > 0 ? (
          MyJobsList.map((Job) => {
            return (
              <Link
                to={`/Jobs/JobDetails/${Job._id}`}
                key={Job._id}
                className="hover:animate-background max-w-[20rem] rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
              >
                <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
                  <time
                    dateTime="2022-10-10"
                    className="block text-xs text-gray-500"
                  >
                    {Job.JobCategory}
                  </time>

                  <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                    {Job.JobTitle}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-1">
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      {Job.JobLocation}
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      {Job.JobPostedOn}
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      {Job.fixedSalary}
                    </span>

                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      {Job.postedBy}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No Jobs Have Been Posted By You</p>
        )}
      </div>
    </>
  );
}

export default MyJobs;
