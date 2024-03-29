import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, RTE } from "../index";
import appwriteService from "../../Appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// once again watch the video Adding form and slug values

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        Status: post?.Status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        console.log(post.Image);
        appwriteService.deleteFile(post.Image);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        Image: file ? file.$id : undefined,
      });
      console.log(`DB post is created post`);
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      console.log(`else clicked`);
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileID = file.$id;
        data.Image = fileID;

        const dbPost = await appwriteService.createPost({
          ...data,
          User_Id: userData.$id,
        });
        console.log(`DB post is created`);
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setIsLoading(false);
  };

  // slug transform acoording to any change
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // interview question method
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe(); // it is used to a memory management
  }, [watch, slugTransform, setValue]);

  return (
    <div className="container mx-auto px-4 mt-10">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap bg-gray-200 rounded-lg shadow-lg p-8"
      >
        <h2 className="w-full text-3xl font-bold mb-6 text-center">
          Add New Post
        </h2>
        <div className="w-full md:w-2/3 pr-4 mb-6 md:mb-0">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-full md:w-1/3 pl-4">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.Image)}
                alt={post.title}
                className="rounded-lg w-full"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("Status", { required: true })}
          />
          <button
            type="submit"
            className={`w-full ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            } bg-indigo-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50`}
            loading={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-transparent rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin"></div>
              </div>
            ) : (
              `${post ? "Update" : "Submit"}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
