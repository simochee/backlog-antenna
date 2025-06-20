import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteNotifications = () => {
	const backlogApi = useBacklogApi();

	const { data } = useInfiniteQuery({
		getNextPageParam(lastGroup) {
			const lastItem = lastGroup.slice().pop();
			return lastItem ? lastItem.id : -1;
		},
		initialPageParam: -1,
		async queryFn({ pageParam }) {
			const minId = pageParam === -1 ? undefined : pageParam;

			const items = await backlogApi.api?.getNotifications({
				count: 100,
				minId,
			});

			return items || [];
		},
		queryKey: ["notifications"],
	});

	const items = data?.pages.flat() || [];

	return { items };
};
