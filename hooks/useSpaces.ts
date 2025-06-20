import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import {
	appendSpace,
	deleteSpace,
	getSpaces,
	updateSpace,
} from "@/storages/spaces";
import type { BacklogSpace } from "@/types/space";

const SPACES_QUERY_KEY = ["spaces"] as const;

/**
 * スペース管理のためのReact Query hook
 * CRUD操作とリアルタイム更新監視を提供する
 */
export const useSpaces = () => {
	const queryClient = useQueryClient();

	// スペース一覧取得
	const spacesQuery = useSuspenseQuery({
		queryFn: getSpaces,
		queryKey: SPACES_QUERY_KEY,
	});

	// スペース追加
	const addSpaceMutation = useMutation({
		mutationFn: appendSpace,
		onError: (error) => {
			console.error("スペース追加エラー:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SPACES_QUERY_KEY });
		},
	});

	// スペース更新
	const updateSpaceMutation = useMutation({
		mutationFn: (space: BacklogSpace) => {
			const { spaceDomain, ...spaceData } = space;
			return updateSpace(spaceDomain, spaceData);
		},
		onError: (error) => {
			console.error("スペース更新エラー:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SPACES_QUERY_KEY });
		},
	});

	// スペース削除
	const deleteSpaceMutation = useMutation({
		mutationFn: deleteSpace,
		onError: (error) => {
			console.error("スペース削除エラー:", error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: SPACES_QUERY_KEY });
		},
	});

	return {
		append: addSpaceMutation.mutate,
		error: spacesQuery.error,
		isAppending: addSpaceMutation.isPending,
		isLoading: spacesQuery.isLoading,
		isRemoving: deleteSpaceMutation.isPending,
		isUpdating: updateSpaceMutation.isPending,
		items: spacesQuery.data ?? [],
		refetch: spacesQuery.refetch,
		remove: deleteSpaceMutation.mutate,
		update: updateSpaceMutation.mutate,
	};
};
