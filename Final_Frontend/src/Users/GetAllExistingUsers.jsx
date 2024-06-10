import React, { useState, useEffect } from "react";
import axios from "axios";

function GetAllExistingUsers() {
  const [AllUsersList, setAllUsersList] = useState();

  useEffect(() => {
    async function FetchAllUsers() {
      try {
        const Response = await axios.get(
          "http://localhost:4000/api/userRoutes/getAllUsers",
          {
            withCredentials: true, // Ensure credentials are included
          }
        );

        setAllUsersList(Response.data.ExistingUsers);
        console.log(Response.data.ExistingUsers);
      } catch (error) {
        console.log(error.message);
      }
    }

    FetchAllUsers();
  }, []);

  return (
    <div className="min-h-[50rem]">
      <div className="flex flex-wrap mx-[5%] gap-2  ">
        {!AllUsersList && <div>Wait</div>}

        {AllUsersList &&
          AllUsersList.map((User) => {
            return (
              <div
                key={User._id}
                className=" z-100 max-w-[30rem]  break-words  p-2"
              >
                <a
                  href="#"
                  className="relative block z-100 overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                >
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {User.Name}
                      </h3>
                    </div>

                    <div className="hidden sm:block sm:shrink-0"></div>
                  </div>
                  <p>{User._id}</p>

                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        {User.Email}
                      </dt>
                    </div>

                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        {User.Role}
                      </dt>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        {User.Phone}
                      </dt>
                    </div>
                  </dl>
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default GetAllExistingUsers;
