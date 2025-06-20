import { storage } from "#imports";

/**
 * WXT storageを使用したAsyncStorage実装
 * TanStack Query AsyncStoragePersisterで使用
 */
export const wxtAsyncStorage = {
	getItem: async (key: string) => {
		try {
			const value = await storage.getItem(`local:${key}`);
			return value || null;
		} catch (error) {
			console.error("Failed to get item from storage:", error);
			return null;
		}
	},
	removeItem: async (key: string) => {
		try {
			await storage.removeItem(`local:${key}`);
		} catch (error) {
			console.error("Failed to remove item from storage:", error);
		}
	},
	setItem: async (key: string, value: string) => {
		try {
			await storage.setItem(`local:${key}`, value);
		} catch (error) {
			console.error("Failed to set item to storage:", error);
		}
	},
};
