import { Link } from "react-router-dom";
import AnimationWrapper from "../common/pageAnimation";
import { CreateContext } from "../context/auth.context";
import { useContext } from "react";
import { removeItemFromSession } from "../common/session";

export const UserNavigationPanel = () => {
  const { userAuthToken, setUserAuthToken }: any = useContext(CreateContext);

    // handles the logout for the user
  const logoutHandler = () => {
    console.log("log out handler")
    console.log(userAuthToken)
    removeItemFromSession({key:"accessToken"})
    removeItemFromSession({key:"profileImageUrl"})
    removeItemFromSession({key:"username"})
    setUserAuthToken(
        {
            accessToken:null,
            profileImageUrl:null,
            username:null
        }
    )
  }
  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      keyValue="userNavigation"
      className="absolute right-4"
    >
      <div className="bg-white absolute right-0 border-gray-200 w-40 overflow-hidden duration-200 flex flex-col  md:hidden border-2 rounded-sm">
        <Link to={"/editor"} className="flex gap-2 link">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link to={`/user/${userAuthToken.username}`} className="link">
          Profile
        </Link>

        <Link to={`/dashboard/blogs`} className=" link">
          Dashboard
        </Link>

        <Link to={`/setting/edit-profile`} className="link">
          Setting
        </Link>

        {/* Divider line */}
        <hr className="border-t border-gray-300 w-full" />

        {/* Sign out button with proper styling */}
        <button className="flex flex-col items-start px-8 py-2 hover:bg-gray-200 w-full text-left hover:cursor-pointer transition-all ease-in-out duration-300"
        onClick={logoutHandler}>
          <h1 className="text-black font-bold">Logout</h1>
          <p className="text-gray-500 text-sm">@{userAuthToken.username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};
