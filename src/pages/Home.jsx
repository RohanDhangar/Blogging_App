import React, { useEffect, useState } from "react";
import appwriteService from "../Appwrite/configuration";
import { Container, PostCard } from "../Components/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const userInfo = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  console.log(userInfo);

  return (
    <div className="py-8">
      <Container>
        {userInfo && (
          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((posts) => (
                <div key={posts.$id}>
                  <PostCard {...posts} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6">Trending Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <Link to="/category/technology">
                <h3 className="text-xl font-semibold mb-2">Technology</h3>
                <p className="text-gray-600">
                  Stay updated with the latest tech news and innovations.
                </p>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <Link to="/category/travel">
                <h3 className="text-xl font-semibold mb-2">Travel</h3>
                <p className="text-gray-600">
                  Discover amazing destinations and travel tips.
                </p>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <Link to="/category/health">
                <h3 className="text-xl font-semibold mb-2">
                  Health & Wellness
                </h3>
                <p className="text-gray-600">
                  Explore health tips and fitness routines for a better
                  lifestyle.
                </p>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <Link to="/category/food">
                <h3 className="text-xl font-semibold mb-2">Food & Recipes</h3>
                <p className="text-gray-600">
                  Delicious recipes and food stories from around the world.
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6">Featured Authors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Author"
                className="w-full h-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                id arcu ac nisi faucibus gravida in vel nisi.
              </p>
              <Link
                to="/author/johndoe"
                className="mt-4 text-blue-600 hover:underline"
              >
                Read more
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Author"
                className="w-full h-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                id arcu ac nisi faucibus gravida in vel nisi.
              </p>
              <Link
                to="/author/johndoe"
                className="mt-4 text-blue-600 hover:underline"
              >
                Read more
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Author"
                className="w-full h-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                id arcu ac nisi faucibus gravida in vel nisi.
              </p>
              <Link
                to="/author/johndoe"
                className="mt-4 text-blue-600 hover:underline"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
        {/* Login button */}
        {!userInfo && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Post your Thought, NOW !!
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
