import wrytrLogo from "../../src/assets/onlyLogo.png";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    /*
            things we need in the navbar
            logo of our app
            search box
            signup , signin button if not logged in otherwise 
            we will show logout button if the user is logged in
            and we will show a avatar of the user who is logged in
        */
    <nav className="border-b border-gray-200">
      {/* we are using th is Link instead of <a> tag because
                if we use <a> tag then it reloads the page which we dont want
                as we are using react and the soul purpose of react is not to
                reload the things

                in order to see the things or use the react router
                dom we had to wrapp up our app inside the BrowserRouter
            */}
      <div className="flex items-center justify-between">
        <div className="md:flex md:items-center md:gap-4 md:p-4">
          {/* inline block is because this whole nav bar was being clickable which we dont want we want only the image to be clickable */}
          <Link to="/" className="inline-block">
            <img src={wrytrLogo} className="h-15 w-15" />
          </Link>

          {/* search bar section */}
          <div className="absolute left-0 w-full mt-0.5 border-b border-gray-200 py-4 px-[5vw] md:border-0 md:relative md:inset-0  md:p-0 md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-black md:w-auto bg-gray-200 p-4 pl-6 pr-[12%] md:pr-6 rounded-lg placeholder:text-gray-600 md:pl-14"
            />
            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-lg pt-1"></i>
            {/*
                 we dont want this search icon to be interactive in larger screens or medium screens that is why we set the value of md:pointer-events-none 
                */}
          </div>
        </div>
        <div className="mr-10 md:hidden">
            <button className="bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center text-md hover:cursor-pointer">
                <i className="fi fi-rr-search"></i>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
