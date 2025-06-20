import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteNotifications = () => {
	const backlogApi = useBacklogApi();

	const { data } = useInfiniteQuery({
		async queryFn({ pageParam }) {
			const minId = pageParam === -1 ? undefined : pageParam;

			const items = await backlogApi.api?.getNotifications({
				count: 5,
				minId,
			});

			return items || [];
		},
		queryKey: ["notifications"],
		getNextPageParam(lastGroup) {
			const lastItem = lastGroup.slice().pop();
			return lastItem ? lastItem.id : -1;
		},
		initialPageParam: -1,
	});

	const items = data?.pages.flat() || [];

	return { items };
};
