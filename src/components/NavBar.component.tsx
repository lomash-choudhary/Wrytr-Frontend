import { useContext, useState } from "react";
import wrytrLogo from "../../src/assets/onlyLogo.png";
import { Link, Outlet } from "react-router-dom";
import { CreateContext } from "../context/auth.context";
import { UserNavigationPanel } from "./UserNavigation.component";
const NavBar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  const { userAuthToken, setUserAuthToken }: any = useContext(CreateContext);

  const [isNavigationPanelOpen, setIsNavigationPanelOpen] = useState(false);

  //used for hadling the state of navigation panel
  const handleTheNavigationPanel = () => {
    setIsNavigationPanelOpen((currentVal) => !currentVal);
  };

  //use when the user click else where other than the profile icon
  const handleBlurTheNavigationPanel = () => {
    setTimeout(() => {
      setIsNavigationPanelOpen(false);
    }, 200);
  };

  return (
    <>
      {/* things we need in the navbar logo of our app search box signup , signin
      button if not logged in otherwise we will show logout button if the user
      is logged in and we will show a avatar of the user who is logged in */}
      <nav className="border-b border-gray-200">
        {/* we are using th is Link instead of <a> tag because
                if we use <a> tag then it reloads the page which we dont want
                as we are using react and the soul purpose of react is not to
                reload the things

                in order to see the things or use the react router
                dom we had to wrapp up our app inside the BrowserRouter
            */}
        <div className="flex items-center justify-between">
          <div className="md:flex md:items-center md:gap-4">
            {/* inline block is because this whole nav bar was being clickable which we dont want we want only the image to be clickable */}
            <Link to="/" className="inline-block">
              <img src={wrytrLogo} className="h-15 w-15" />
            </Link>

            {/* search bar section */}
            <div
              className={`absolute left-0 w-full mt-0.5 border-b border-gray-200 py-4 px-[5vw] md:border-0 md:relative md:inset-0  md:p-0 md:w-auto ${
                searchBoxVisibility ? "show" : "hide"
              } md:!opacity-100 md:!pointer-events-auto`}
            >
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-black md:w-auto bg-gray-200 p-2 pl-6 pr-[12%] md:pr-4 rounded-lg placeholder:text-gray-600 md:pl-12 placeholder:text-md text-gray-800"
              />
              <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-md pt-1"></i>
              {/*
                 we dont want this search icon to be interactive in larger screens or medium screens that is why we set the value of md:pointer-events-none 
                */}
            </div>
          </div>

          {/* search bar toggle button */}
          <div className="mr-4 flex gap-4 items-center">
            <div className="md:hidden">
              <button
                className="bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-md hover:cursor-pointer"
                onClick={() =>
                  setSearchBoxVisibility((currentVal) => !currentVal)
                }
              >
                <i className="fi fi-rr-search"></i>
              </button>
            </div>
            {/* write blog link */}
            <Link
              to={"/editor"}
              className="hidden md:flex gap-2 items-center hover:bg-gray-200 p-2 rounded-lg ease-in-out transition-all duration-150"
            >
              <i className="fi fi-rr-file-edit"></i>
              <p>Write</p>
            </Link>

            {userAuthToken.accessToken !== null ? (
              <>
                <Link to={"/dashboard/notification"}>
                  <button className="bg-gray-300 h-10 w-10 rounded-full flex justify-center items-center hover:bg-gray-400/50 hover:cursor-pointer transition-all ease-in duration-300">
                    <i className="fi fi-rr-bell mt-1 block"></i>
                  </button>
                </Link>

                <div>
                  <button
                    className="w-10 h-10 mt-1"
                    onClick={handleTheNavigationPanel}
                    onBlur={handleBlurTheNavigationPanel}
                  >
                    <img
                      src={userAuthToken.profileImageUrl}
                      className="w-full h-full rounded-lg hover:cursor-pointer object-cover"
                    />
                  </button>

                  {isNavigationPanelOpen ? <UserNavigationPanel /> : ""}
                </div>
              </>
            ) : (
              <>
                <Link to={"/signin"} className="btn-black">
                  Sign In
                </Link>
                <Link to={"/signup"} className="hidden md:block btn-white">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* for /signup and /signin */}
      <Outlet />
    </>
  );
};

export default NavBar;
