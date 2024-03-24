import config from "../config/config";
import { Client, Databases, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

// vvimp snippit for backend auth service

export class AuthService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      return this.login({ email, password }); // {} is missing here same  as in frontend err 5
    } catch (err) {
      throw err;
    }
  }

  async login({ email, password }) {
    // {} is missing in func call err 4
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.log("appwrite service error :: logout ", err);
    }
  }
}

const authService = new AuthService();

export default authService;

// as this code is very future friendly and In this we have created the functionality and services for our authentications considering that
// we have already servers and databases in appwrite If we want to change from appwrite to any other plateform than simply change the constructor
// and env file
