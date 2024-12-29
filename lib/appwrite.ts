import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from 'expo-web-browser';


export const config = {
    platform: "com.shinobi.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)
    .setPlatform(config.platform!)

export const avatars = new Avatars(client);
export const account = new Account(client);

// Login Function 
export async function login() {
    try {
        const redirectURL = Linking.createURL("/");

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectURL)

        if (!response) throw new Error("Failed to login");

        const browserResult = await WebBrowser.openAuthSessionAsync(response.toString(), redirectURL);

        if (browserResult.type !== "success") throw new Error("Failed to login");

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get("secret")?.toString();
        const userID = url.searchParams.get("user")?.toString();

        if (!secret || !userID) throw new Error("Failed to login");

        const session = await account.createSession(userID, secret);

        if (!session) throw new Error("Failed to login");

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
export async function getUser() {
    try {
        const response = await account.get();

        if (response.$id) {
            const userAvatar = avatars.getInitials(response.name);

            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}