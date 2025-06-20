import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { QueryClient } from "@tanstack/react-query";
import { wxtAsyncStorage } from "./storage";

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
