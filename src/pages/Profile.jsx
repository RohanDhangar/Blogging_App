import React, {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import AppwriteService from "../Appwrite/Profile";

function Profile() {
  // Assuming you have stored user data in your Redux state
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState(null);
  useEffect(() => {}, []);
  AppwriteService.getDetails(userData.$id).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

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
            <p className="mt-1 text-lg font-semibold">{userData.phone}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <p className="mt-1 text-lg font-semibold">{userData.DOB}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Bio:
            </label>
            <p className="mt-1 text-lg font-semibold">{userData.Bio}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Expertise:
            </label>
            <p className="mt-1 text-lg font-semibold">{userData.expert}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
