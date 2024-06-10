import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Toaster from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApplicationForm() {
  const [Email, setEmail] = useState();
  const [Name, setName] = useState();
  const [Address, setAddress] = useState();
  const [Phone, setPhone] = useState();
  const [JobId, setJobId] = useState();
  const [CoverLetter, setCoverLetter] = useState();
  const [Resume, setResume] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  console.log("JOb Is is " + id);
  if (!id) {
    Toaster.error("Error Applying to Job");
  }

  function handleResumeFileUpload(e) {
    const file = e.target.files[0];

    setResume(file);
    setJobId(id);
  }

  async function ApplyToJob(e) {
    e.preventDefault();
    console.log("Job Id" + JobId);
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("jobId", JobId);
      formData.append("Name", Name);
      formData.append("Email", Email);
      formData.append("Phone", Phone);
      formData.append("Address", Address);
      formData.append("Resume", Resume);
      formData.append("coverLetter", CoverLetter);

      const Response = await axios.post(
        "http://localhost:4000/api/applicationRoutes/postApplication",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (Response.status === 200) {
        navigate("/");
        Toaster.success("Successfully Applied For this Job");
        console.log(Response);
      }
    } catch (error) {
      console.log("Job Id" + JobId);
      console.log(error);
      Toaster.error(error.response.data.message);
    }
  }

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl min-h-[50rem]  lg:max-w-3xl">
              <h1 className="mt-2 text-2xl font-bold text-gray-900  sm:text-3xl md:text-4xl">
                Application Form 🦑
              </h1>
              {/* <p className="text-4xl">Application Form</p> */}
              <form
                onSubmit={ApplyToJob}
                action=""
                className="mt-8 grid grid-cols-6 gap-6"
              >
                {/* Name */}
                <div className="col-span-6 p-2 sm:col-span-3">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                    value={Name}
                    type="text"
                    id="Name"
                    name="Name"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Email"
                    className="block text-sm p-2  font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    value={Email}
                    type="Email"
                    id="Email"
                    name="Email"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Phone"
                    className="block text-sm p-2  font-medium text-gray-700"
                  >
                    Enter Yor Phone Number
                  </label>

                  <input
                    required={true}
                    onChange={(e) => setPhone(e.target.value)}
                    value={Phone}
                    type="number"
                    id="Phone"
                    name="Phone"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* Address */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Address"
                    className="block text-sm p-2  font-medium text-gray-700"
                  >
                    Enter Yor Address
                  </label>

                  <input
                    required={true}
                    onChange={(e) => setAddress(e.target.value)}
                    value={Address}
                    type="text"
                    id="Phone"
                    name="Phone"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* CoverLetter */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="CoverLetter"
                    className="block text-sm p-2  font-medium text-gray-700"
                  >
                    CoverLetter
                  </label>

                  <input
                    required={true}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    value={CoverLetter}
                    type="text"
                    id="CoverLetter"
                    name="CoverLetter"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                {/* Resume */}
                <div className="col-span-6 ">
                  <label
                    htmlFor="Resume"
                    className="flex p-2  hover:cursor-pointer gap-4"
                  >
                    <input
                      required={true}
                      onChange={handleResumeFileUpload}
                      // value={Resume}
                      type="file"
                      id="Resume"
                      name="Resume"
                      className="w-24 h-10 p-1 hover:cursor-pointer rounded-md border-gray-200 bg-white shadow-sm"
                    />
                    Upload Your Resume
                  </label>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  >
                    Apply Now
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default ApplicationForm;
