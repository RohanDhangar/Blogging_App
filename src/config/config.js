// import fro

const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteUserCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
};

// console.log(config);

// humne ye file es liye create ki hai kuki kai bar .env file agar load ni hoti h toh pura application crash kr jati h so In that case In productions we
// usually create that app to make our app running esme hum config naam ke object me sirf key value pair pas kar denge

export default config;
