import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { QueryClient } from "@tanstack/react-query";
import { storage } from "#imports";

/**
 * TanStack Query用のAsyncStoragePersister実装
 * WXT storageを使用してQueryClientの永続化を行う
 */
const wxtAsyncStorage = {
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

/**
 * TanStack Query用のQueryClientを作成
 */
export const createQueryClient = () => {
	const persister = createAsyncStoragePersister({
		key: "react-query-cache",
		storage: wxtAsyncStorage,
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 24 * 60 * 60 * 1000, // 24時間保持
				staleTime: 3 * 60 * 1000, // 3分間キャッシュ
			},
		},
	});

	// QueryClientを永続化
	persistQueryClient({
		maxAge: 24 * 60 * 60 * 1000, // 24時間
		persister,
		queryClient,
	});

	return queryClient;
};
