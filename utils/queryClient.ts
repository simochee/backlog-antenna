import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { storage } from "#imports";

const persistStorage = storage.defineItem<
	Record<string, { value: string; timestamp: number }>
>("local:reactQueryPersist", { fallback: {} });

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 24 * 60 * 60 * 1000, // 24時間保持
			staleTime: 3 * 60 * 1000, // 3分間キャッシュ
		},
	},
});

export const persister = createAsyncStoragePersister({
	key: "react-query-cache",
	storage: {
		getItem: async (key: string) => {
			const cache = await persistStorage.getValue();
			return cache[key]?.value;
		},
		removeItem: async (key: string) => {
			const cache = await persistStorage.getValue();
			delete cache[key];
			await persistStorage.setValue(cache);
		},
		setItem: async (key: string, value: string) => {
			const cache = await persistStorage.getValue();
			cache[key] = { value, timestamp: Date.now() };
			await persistStorage.setValue(cache);
		},
	},
});
