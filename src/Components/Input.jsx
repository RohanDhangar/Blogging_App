import React, { useId } from "react";

// it is very important here we are going to learn the forewardref hook it is used in mainly production apps, its functionalitu define in
// such a way that if we are creating the input as a diffrent component and we are using it in other component and we want access the
// value in that component only than this hook came into picture it provide the refrence of the state in that component and we can do the stuff

const Input = React.forwardRef(function Inupt(
  { label, type = "text", className = "", ...props },
  ref
) {
  const Id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={Id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
        px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
        ${className}`}
        ref={ref}
        {...props}
        id={Id}
      />
    </div>
  );
});

export default Input;
