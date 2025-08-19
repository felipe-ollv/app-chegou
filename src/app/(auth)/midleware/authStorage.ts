import * as SecureStore from 'expo-secure-store';

const SECRET = 'secret';

export async function saveToken(data: string) {
    await SecureStore.setItemAsync(SECRET, data);
}

export async function getToken() {
    return await SecureStore.getItemAsync(SECRET);
}

export async function deleteToken() {
    await SecureStore.deleteItemAsync(SECRET);
}
