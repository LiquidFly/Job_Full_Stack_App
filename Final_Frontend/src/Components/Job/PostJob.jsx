import React, { useState } from "react";
import axios from "axios";
import Toaster from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function PostJob() {
  const [JobTitle, setJobTitle] = useState();
  const [JobDescription, setJobDescription] = useState();
  const [JobCategory, setJobCategory] = useState();
  const [JobLocation, setJobLocation] = useState();
  const [fixedSalary, setfixedSalary] = useState();

  const navigate = useNavigate();
  async function PostingAJob(e) {
    e.preventDefault();

    try {
      const Response = await axios.post(
        "http://localhost:4000/api/jobRoutes/postJob",
        {
          JobTitle,
          JobDescription,
          JobCategory,
          fixedSalary,
          JobLocation,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (Response.status === 200) {
        Toaster.success("Job Posted Successfully");
        navigate("/Jobs");
        console.log(Response);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className=" min-h-[50rem]">
      
    <p className="text-4xl text-center mt-4">  Post A New Job</p>
      <form onSubmit={PostingAJob} className="max-w-[50rem] p-6 mx-auto">
        <div className="mb-5">
          <label
            htmlFor="JobTitle"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            JobTitle
          </label>
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            value={JobTitle}
            type="text"
            id="JobTitle"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Developer"
            required={true}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="JobDescription"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            JobDescription
          </label>
          <input
            onChange={(e) => setJobDescription(e.target.value)}
            value={JobDescription}
            type="text"
            id="JobDescription"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="JobCategory"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            JobCategory
          </label>
          <input
            onChange={(e) => setJobCategory(e.target.value)}
            value={JobCategory}
            type="text"
            id="JobCategory"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            JobLocation
          </label>
          <input
            onChange={(e) => setJobLocation(e.target.value)}
            value={JobLocation}
            type="text"
            id="JobLocation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fixedSalary"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            fixedSalary
          </label>
          <input
            onChange={(e) => setfixedSalary(e.target.value)}
            value={fixedSalary}
            type="number"
            id="fixedSalary"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostJob;
