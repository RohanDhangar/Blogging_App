import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import appwriteService from "../Appwrite/Profile";
import Button from "@girishsawant999/react-loading-button";

const CompleteProfile = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const completeProfile = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const userId = userData.$id;
      const completeUserData = await appwriteService.AddDetails({
        ...data,
        AccountId: userId,
      });

      if (completeUserData) {
        dispatch(login(completeUserData));
        console.log("Updated user data dispatched:", completeUserData);
        window.location.href = "/";
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Complete Your Profile
      </h2>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(completeProfile)}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
        >
          {error && (
            <p className="text-red-600 mt-0 mb-4 text-center">
              {error.toString()}
            </p>
          )}
          <div className="space-y-5">
            <Input
              label="Phone Number: "
              placeholder="Enter your phone number"
              {...register("PhoneNum", {
                required: true,
              })}
            />
            <Input
              label="Date of Birth: "
              type="date"
              placeholder="Select your date of birth"
              {...register("DOB", {
                required: true,
              })}
            />
            <Input
              label="Bio: "
              placeholder="Tell us about yourself"
              textarea="200"
              cols="50"
              row="10"
              {...register("Bio")}
            />
            <Input
              label="Expertise: "
              placeholder="Enter your area of expertise"
              {...register("expert")}
            />

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              primary
              ball-triangle
            >
              Update the Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
