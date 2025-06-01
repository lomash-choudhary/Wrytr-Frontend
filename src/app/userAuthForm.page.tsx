import { useContext, useState } from "react";
import InputBoxComp from "../components/InpuptBox.component";
import GoogleLogo from "../assets/googleLogo.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/pageAnimation";
import { Toaster, toast } from "react-hot-toast";
import type { UserAuthFormServerInterface } from "../interfaces/userAuthForm.interface";
import axios from "axios";
import { storeInSession } from "../common/session";
import { CreateContext } from "../context/auth.context";
import { authWithGoogleFn } from "../components/Firebase";

const UserAuthForm = ({ type }: typeOfForm) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });
  const { userAuthToken, setUserAuthToken }: any = useContext(CreateContext);
  //regex for email and password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

  //eye toggler for password to view or hide password
  const toggleEye = () => {
    setIsVisible(!isVisible);
  };

  //this will handel the form changes i.e. if any field such as firstName or username gets changed then it will first expand the available fields using the rest operator and then it will get the traget name i.e which field has been changed and then it will get the traget.value to know that what is the new value of the field and then it will assign that value to that particular filed
  const handleFormChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userAuthThroughServer = async ({
    endPoint,
    formData,
  }: UserAuthFormServerInterface) => {
    try {
      const serverResponse = await axios.post(
        `${import.meta.env.VITE_USER_BASE_URL}${endPoint}`,
        formData
      );
      const { data } = serverResponse;
      const accessToken = data?.data?.accessToken;
      const profileImageUrl = data?.data?.profileImage;
      const username = data?.data?.username;
      storeInSession({
        key: "accessToken",
        value: accessToken,
      });
      storeInSession({
        key: "profileImageUrl",
        value: profileImageUrl,
      });
      storeInSession({
        key: "username",
        value: username,
      });
      setUserAuthToken({ accessToken, profileImageUrl, username });
      const successMessage = data?.message;
      toast.success(successMessage);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        //get the actual error from the backend
        const errorMessage =
          error.response.data?.message || "Unknow error occured";
        const statusCode = error.response.status;
        toast.error(`${errorMessage}, Status Code: ${statusCode}`);
      } else {
        toast.error(
          "Network or server error occured, Please make sure you are connected to the internet"
        );
        console.log(`Error occurred while signing up:`, error);
      }
    }
  };

  //this method is being called when we click on the signup or sign in button
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const endPoint = type == "sign-in" ? "/login" : "/signup";

    const { email, username, password, fullName } = formData;

    if (fullName) {
      if (fullName.length > 255) {
        return toast.error("Please enter a valid username");
      }
    }

    if (email) {
      if (!emailRegex.test(email)) {
        return toast.error("Please enter a valid email address");
      }
    }

    if (password) {
      if (password.length < 8) {
        return toast.error("Password must be 8 characters long");
      }
      if (!passwordRegex.test(password)) {
        return toast.error(
          "Password must contain atleast one upper, one lower, one numeric and one special character"
        );
      }
    }
    userAuthThroughServer({ endPoint, formData });
  };

  //handle google auth function

  const handleGoogleAuth = async (e: any) => {
    e.preventDefault();
    try {
      const user = await authWithGoogleFn();
      console.log(user);
    } catch (error) {
      toast.error("Error occured while signing up with Google")
      console.log(error)
    }
  };

  /*
  but this animation wrapper dont have any way to tell framer motion that sign up and 
  sign in div are two different things because we only have a single section 
  so we will use key property
*/
  return userAuthToken.accessToken ? (
    <Navigate to={"/"} />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="flex flex-col items-center justify-center md:h-[calc(100vh-76px)] h-[calc(100vh-65px)]">
        <Toaster />
        <div className="flex items-center justify-center">
          <form className=" max-w-[400px]">
            <h1 className="text-4xl font-semibold capitalize text-center font-updock md:text-6xl pb-2">
              {type == "sign-in" ? "welcome back" : "join us today"}
            </h1>
            {type == "sign-up" ? (
              <InputBoxComp
                value={formData.fullName}
                onChange={handleFormChange}
                name="fullName"
                placeholder="Full Name"
                type="text"
                iconType="fi-rr-id-card-clip-alt"
              />
            ) : (
              ""
            )}

            {type == "sign-up" ? (
              <InputBoxComp
                value={formData.username}
                onChange={handleFormChange}
                name="username"
                placeholder="Username"
                type="text"
                iconType="fi-rr-user"
              />
            ) : (
              ""
            )}

            <InputBoxComp
              value={formData.email}
              onChange={handleFormChange}
              name="email"
              placeholder="Email"
              type="email"
              iconType="fi-rr-at"
            />

            <InputBoxComp
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              placeholder="Password"
              type={`${isVisible ? "text" : "password"}`}
              iconType="fi-rr-eye"
              toggleEye={toggleEye}
              isVisible={isVisible}
            />
          </form>
        </div>

        <div className="w-[250px] md:w-[300px]">
          <button
            type="submit"
            className="btn-gray capitalize mt-4 flex items-center justify-center w-full"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>
        </div>

        <div className="w-[400px] md:w-[600px] flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black " />
          <p>OR</p>
          <hr className="w-1/2 border-black " />
        </div>

        <div className="w-[250px] md:w-[300px]">
          <button
            className="btn-black flex items-center justify-center gap-2 w-full"
            onClick={handleGoogleAuth}
          >
            <img src={GoogleLogo} className="w-6 h-6" />
            Continue with Google
          </button>
        </div>

        {type == "sign-in" ? (
          <p className="mt-6 text-gray-600 text-lg text-center">
            Don't have an account ?
            <Link to={"/signup"} className="underline text-black text-lg ml-1">
              Join us today
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-gray-600 text-lg text-center">
            Already a member ?
            <Link className="underline text-black text-lg ml-1" to={"/signin"}>
              Sign in here
            </Link>
          </p>
        )}
      </section>
    </AnimationWrapper>
  );
};

interface typeOfForm {
  type: string;
}

export default UserAuthForm;
