import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./../Auth/Login";

function Navbar() {
  const [showInsideHamburger, setShowInsideHamburger] = useState(false);
  const { IsAuthorized, User, setIsAuthorized } = useContext(AppContext);
  const [ShowUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {}, [IsAuthorized]);

  function handleHamburger() {
    if (showInsideHamburger) {
      setShowInsideHamburger(false);
    } else {
      setShowInsideHamburger(true);
    }
  }
  const navigate = useNavigate();

  // ! Function To Log Out The User
  async function handleLogOut() {
    const Response = await axios.get(
      "http://localhost:4000/api/userRoutes/logOutUser",
      {
        withCredentials: true,
      }
    );
    if (Response.status === 200) {
      console.log(Response);
      setIsAuthorized(false);
      navigate("/Login");
    } else {
      console.log("Error ");
    }
  }

  async function handleuserInfo() {
    const Response = await axios.get(
      "http://localhost:4000/api/userRoutes/getCurrentUser",
      {
        withCredentials: true,
      }
    );

    console.log(Response.data.currentUser);

    if (Response.status === 200) {
      setShowUserInfo(!ShowUserInfo);
    }
  }

  return (
    <>
      {IsAuthorized === true ? (
        <nav className="flex overflow-y-hidden items-center px-4 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  text-white justify-between">
          <div className="left px-8">
            <Link to="/">Job Dekho.com</Link>
          </div>

          <div className="Right px-4">
            {User.Role === "Job Seeker" ? (
              <>
                <div className="hidden  md:flex">
                  <ul className="flex justify-around w-[45rem]">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/Jobs">All Jobs</Link>
                    </li>
                    <li>
                      <Link to="/MyApplications/me">My Application</Link>
                    </li>
                    <li>
                      <button onClick={handleuserInfo}>{User.Name}</button>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>LogOut</button>
                    </li>
                  </ul>
                </div>

                {ShowUserInfo == true ? (
                  <div className="absolute top-10 z-100 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  break-words right-16 p-2">
                    <a
                      href=""
                      className="relative block z-100 overflow-hidden  p-4 sm:p-6 lg:p-8"
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
                ) : null}

                {/* <div className="HAMBURGER  block px-10 md:hidden">
                  <button onClick={handleHamburger}>HAMBURGER</button>
                  {showInsideHamburger && (
                    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-green-500 flex-col justify-between border-e bg-white">
                      <div className="px-4 py-6">
                        <ul className="mt-6 flex flex-col gap-5 text-white space-y-1">
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/Jobs">All Jobs</Link>
                          </li>
                          <li>
                            <Link to="/MyApplications/me">My Application</Link>
                          </li>
                          <button onClick={handleLogOut}>LogOut</button>
                        </ul>
                      </div>

                      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                        <a
                          href="#"
                          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                        >
                          <img
                            alt=""
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="size-10 rounded-full object-cover"
                          />

                          <div>
                            <p className="text-xs">
                              <strong className="block font-medium">
                                Eric Frusciante
                              </strong>

                              <span> eric@frusciante.com </span>
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div> */}

                <div className="HAMBURGER  absolute right-3 top-3 px-10 md:hidden">
                  <button onClick={handleHamburger}>HAMBURGER</button>
                  {showInsideHamburger && (
                    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white flex-col justify-between border-e bg-white">
                      <div className="px-4 py-6">
                    
                         <ul className="mt-6 flex flex-col gap-5 text-white space-y-1">
                          <li>
                            <Link to="/">Home </Link>
                          </li>
                          <li>
                            <Link to="/Jobs">All Jobs</Link>
                          </li>
                          <li>
                            <Link to="/MyApplications/me">My Application</Link>
                          </li>
                          <button onClick={handleLogOut}>LogOut</button>
                        </ul>
                      </div>

                      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                        <a
                          href="#"
                          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                        >
                          <img
                            alt=""
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="size-10 rounded-full object-cover"
                          />

                          <div>
                            <p className="text-xs">
                              <strong className="block font-medium">
                                Eric Frusciante
                              </strong>

                              <span> eric@frusciante.com </span>
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="hidden  md:flex">
                  <ul className="flex justify-around w-[55rem]">
                    <li>
                      {" "}
                      <Link to="/">Home</Link>{" "}
                    </li>{" "}
                    <li>
                      <Link to="/GetAllExistingUsers">Get All Users</Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/Jobs">All Jobs</Link>{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <Link to="/PostJob">Post A New Job</Link>{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <Link to="/MyJobs/me">View Your Jobs</Link>{" "}
                    </li>{" "}
                    <a
                      className="hover:cursor-pointer"
                      onClick={handleuserInfo}
                    >
                      {User.Name}
                    </a>
                    <li>
                      <button onClick={handleLogOut}>LogOut</button>
                    </li>
                  </ul>
                </div>

                {ShowUserInfo == true ? (
                  <div className="absolute top-10 z-50  break-words right-16 p-2">
                    <a
                      href="#"
                      className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
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
                ) : null}
          <div className="HAMBURGER  absolute right-3 top-3 px-10 md:hidden">
            <button onClick={handleHamburger}>HAMBURGER</button>
            {showInsideHamburger && (
              <div className="flex h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                  <ul className="mt-6 flex flex-col gap-5 text-white space-y-1">
                    <li>
                      {" "}
                      <Link to="/">Home</Link>{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <Link to="/Jobs">All  Jobs</Link>{" "}
                    </li>{" "}
                    <li>
                      {" "}
                      <Link to="/PostJob">Post A New Job</Link>{" "}
                    </li>{" "}
                    <li>
                      <Link to="/GetAllExistingUsers">Get All Users</Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/MyJobs/me">View Your Jobs</Link>{" "}
                    </li>{" "}
                    <li>
                      <button onClick={handleLogOut}>LogOut</button>
                    </li>
                  </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                  <a
                    href="#"
                    className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="size-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-xs">
                        <strong className="block font-medium">
                          Eric Frusciante
                        </strong>

                        <span> eric@frusciante.com </span>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
              </>
            )}
          </div>
        </nav>
      ) : (
        <div className=" mx-auto flex md:justify-end justify-center mt-3 items-center gap-6">
          <Link
            to="/Register"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </Link>
          <Link
            to="/Login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
