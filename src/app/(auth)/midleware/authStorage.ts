import * as SecureStore from 'expo-secure-store';

const SECRET = 'secret';

class ActionStorage {
    static async saveToken(data: any) {
        await SecureStore.setItemAsync(SECRET, data);
    }

    static async getToken() {
        return await SecureStore.getItemAsync(SECRET);
    }

    static async deleteToken() {
        await SecureStore.deleteItemAsync(SECRET);
    }
}

export default ActionStorage;


