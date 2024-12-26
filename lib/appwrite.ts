import { Account, Avatars, Client } from "react-native-appwrite";
import * as Linking from "expo-linking";

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

export async function login() {
    try {
        //
    } catch (error) {
        console.error(error);
        return false;
    }
}