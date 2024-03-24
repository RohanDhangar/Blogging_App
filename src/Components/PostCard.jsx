import React from "react";
import appwriteService from "../Appwrite/configuration";
import { Link } from "react-router-dom";

function PostCard({ $id, title, Image }) {
  return (
    <Link to={`/post/${$id}`} className="w-full bg-white rounded-xl shadow-lg p-4 transition duration-300 transform hover:scale-105">
      <div className="w-full mb-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(Image)}
            alt="Image not found"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
