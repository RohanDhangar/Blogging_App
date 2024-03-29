import config from "../config/config";
import { Client, Databases, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async AddDetails({ PhoneNum, Bio, expert, DOB, AccountId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        AccountId,
        {
          PhoneNum,
          Bio,
          DOB,
          expert,
          AccountId,
        }
      );
    } catch (err) {
      console.log(`this is error of Complete Profile ${err}`);
      throw err;
    }
  }

  async getDetails(AccountId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        AccountId
      );
    } catch (err) {
      console.log(`error in getting user details: ${err}`);
      throw false;
    }
  }
}

const service = new Service();

export default service;