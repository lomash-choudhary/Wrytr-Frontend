import { useState } from "react";

const InputBoxComp = ({
  name,
  placeholder,
  type,
  id,
  value,
  iconType,
  toggleEye,
  isVisible
}: inputBoxType) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <div className="relative mb-4 mt-4">
        <input
          name={name}
          placeholder={placeholder}
          type={type}
          id={id}
          defaultValue={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`bg-gray-200 p-2 pl-8 rounded-lg font-normal text-sm w-[250px] outline-stone-700 placeholder:text-sm md:text-lg md:placeholder:text-md md:w-[300px] ${
            isFocused
              ? "bg-transparent ease-in-out transition-all duration-150"
              : ""
          }`}
        />
        {name === "password" ? (
          <i
            onClick={() => toggleEye()}
            className={`fi ${isVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"} font-normal text-sm md:text-lg absolute top-1/2 -translate-y-1/3 left-2 text-center transition-all ease-in-out duration-1000 hover:cursor-pointer`}
          ></i>
        ) : (
          <i
            className={`fi ${iconType} font-normal text-sm absolute top-1/2 -translate-y-1/3 left-2 text-center md:text-lg`}
          ></i>
        )}
      </div>

    </div>
  );
};

interface inputBoxType {
  name: string;
  placeholder: string;
  type: string;
  id?: any;
  value?: any;
  iconType: string;
  toggleEye?: any;
  isVisible? :boolean
}

export default InputBoxComp;
