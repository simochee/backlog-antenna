import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { storage } from "#imports";

/**
 * TanStack Query用のAsyncStoragePersister実装
 * WXT storageを使用してQueryClientの永続化を行う
 */
const WxtAsyncStorage = {
	getItem: async (key: string) => {
		const value = await storage.getItem(`local:${key}`);
		return value || null;
	},
	removeItem: async (key: string) => {
		await storage.removeItem(`local:${key}`);
	},
	setItem: async (key: string, value: string) => {
		await storage.setItem(`local:${key}`, value);
	},
};

/**
 * TanStack Query用のQueryClientを作成
 */
export const createQueryClient = () => {
	const _persister = createAsyncStoragePersister({
		key: "react-query-cache",
		storage: WxtAsyncStorage,
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
	// persistQueryClient({
	// 	maxAge: 24 * 60 * 60 * 1000, // 24時間
	// 	persister,
	// 	queryClient,
	// });

	return queryClient;
};
