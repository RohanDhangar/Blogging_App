import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/configuration";
import { Button, Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.User_Id === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((Status) => {
      if (Status) {
        appwriteService.deleteFile(post.Image);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-20">
      <Container>
        <div className="w-full flex flex-col md:flex-row items-center border rounded-xl p-4 md:p-6 shadow-lg bg-gray-200">
          <div className="w-full md:w-1/2 md:mr-6 mb-4 md:mb-0 relative">
            <img
              src={appwriteService.getFilePreview(post.Image)}
              alt={post.title}
              className="rounded-xl w-full"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>
            <p className="text-gray-600 mb-6">{post.createdAt}</p>
            <div className="browser-css">{parse(post.content)}</div>
            {isAuthor && (
              <div className="flex justify-center mt-14">
                <div className="space-x-4">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500">Edit</Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

// must do line by line checkup
