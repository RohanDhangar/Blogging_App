import config from "../config/config";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, Image, Status, User_Id }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          Image,
          Status,
          User_Id,
        }
      );
    } catch (err) {
      console.log(`this is error of create post ${err}`);
    }
  }

  async updatePost(slug, { title, content, Image, Status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          Image,
          Status,
        }
      );
    } catch (err) {
      console.log(`this is error of update post ${err}`);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      console.log(`this is error of delete post${err}`);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.log(`this is error of get post${err}`);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("Status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.log(`this is error of get posts${err}`);
      return false;
    }
  }

  // file upload services
  async uploadFile(file) {
    try {
      const image = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      // console.log(image)
      return image;
    } catch (err) {
      console.log(`this is error of upload post${err}`);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId, 
        fileId
      )
      return true;
    } catch (err) {
      console.log(`this is error of delete post${err}`);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
        config.appwriteBucketId, 
        fileId
      )
    }
}

const service = new Service();

export default service;

// dobut : what is the more work we have to do if we create our own backend instead using as services
