import React, { useEffect, useState } from "react";

import axios from "axios";

function MyApplications() {
  const [MyApplications, setMyApplications] = useState([]);

  useEffect(() => {
    async function FetchMyApplications() {
      try {
        const Response = await axios.get(
          "http://localhost:4000/api/applicationRoutes/getMyApplication",
          {
            withCredentials: true, // Ensure credentials are included
          }
        );
        setMyApplications(Response.data.myApplications);
        console.log("LIST IS");
        console.log(MyApplications);
      } catch (error) {
        console.log(error.message);
      }
    }
    FetchMyApplications();
  }, []);

  return (
    <div className="flex gap-8 flex-wrap mx-[10%]">
      {MyApplications.length > 0 ? (
        MyApplications.map((Data) => {
          return (
            <div key={Data._id}>
              <a
                href="#"
                className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
              >
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                <div className="sm:flex sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                      {Data.Name}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">
                      {Data.Phone}
                    </p>
                  </div>

                  <div className="hidden sm:block sm:shrink-0">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                      className="size-16 rounded-lg object-cover shadow-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">{Data.Email}</div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                      {Data.coverLetter}
                    </dt>
                  </div>
                </dl>
              </a>
            </div>
          );
        })
      ) : (
        <p>Yo have Not Applied To Any Of The Jobs</p>
      )}
    </div>
  );
}

export default MyApplications;
