import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";


export const config = {
    platform: "com.shinobi.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionID: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionID: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// Login Function 
export async function login() {
    try {
      const redirectURL = Linking.createURL("/");
  
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectURL
      );
      if (!response) throw new Error("failed to login");
  
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectURL
      );

      if (browserResult.type !== "success")
        throw new Error("failed to login");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
  
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

// Logout Function 
export async function logout() {
    try {
      await account.deleteSession("current");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

// Get User Function
export async function getCurrentUser() {
    try {
        const response = await account.get();

        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name);

            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }

        return null;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseID!,
      config.propertiesCollectionID!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]

    )
    return result.documents;
    
  } catch (error) {
    console.error(error);
    return [];
  }
}