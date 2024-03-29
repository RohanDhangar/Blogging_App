import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppwriteService from "../Appwrite/Profile";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    AppwriteService.getDetails(userData.$id).then((user) => {
      if (user) {
        setUserDetails(user);
      }
    });
  }, []);

  // console.log(userDetails);

  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile Page</h2>
      <div className="bg-white shadow-md rounded-lg px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name:
            </label>
            <p className="mt-1 text-lg font-semibold">{userData.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <p className="mt-1 text-lg font-semibold">{userData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <p className="mt-1 text-lg font-semibold">
              {/* here ? play the vitle role in the game that is I am asking variable that if u have value than display if not than don't
              so here my code is not disturbed while if I remove the ? than API took time to get the data so mean while application got crashed
              */}
              {userDetails?.PhoneNum}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <p className="mt-1 text-lg font-semibold">{userDetails?.DOB}</p> 
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Bio:
            </label>
            <p className="mt-1 text-lg font-semibold">{userDetails?.Bio}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Expertise:
            </label>
            <p className="mt-1 text-lg font-semibold">{userDetails?.expert}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
