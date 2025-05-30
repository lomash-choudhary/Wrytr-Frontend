import { useState } from "react";
import InputBoxComp from "../components/InpuptBox.component";
import GoogleLogo from "../assets/googleLogo.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/pageAnimation";

const UserAuthForm = ({ type }: typeOfForm) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
  });

  const toggleEye = () => {
    setIsVisible(!isVisible);
  };

  const handleFormChange = (e: any) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };
  /*
  but this animation wrapper dont have any way to tell framer motion that sign up and 
  sign in div are two different things because we only have a single section 
  so we will use key property
*/
  return (
    <AnimationWrapper keyValue={type}>
      <section className="flex flex-col items-center justify-center md:h-[calc(100vh-76px)] h-[calc(100vh-65px)]">
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
          <button className="btn-black flex items-center justify-center gap-2 w-full">
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
