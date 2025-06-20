import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";

type Props = {
	count: number;
	estimateSize: (index: number) => number;
	renderItem: (virtualItem: VirtualItem) => React.ReactNode;
	onLoadNextPage?: () => Promise<unknown>;
	isFetchingNextPage?: boolean;
	hasNextPage?: boolean;
};

export const VirtualList: React.FC<Props> = ({
	count,
	estimateSize,
	renderItem,
	onLoadNextPage,
	isFetchingNextPage,
	hasNextPage,
}) => {
	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: onLoadNextPage && hasNextPage ? count + 1 : count,
		estimateSize: (index) => {
			const size = estimateSize(index);
			return index === 0 ? size : size + 1;
		},
		getScrollElement: () => parentRef.current,
		overscan: 5,
	});

	useEffect(() => {
		const lastItem = virtualizer.getVirtualItems().slice().pop();

		if (!lastItem) {
			return;
		}

		if (lastItem.index >= count - 1 && hasNextPage && !isFetchingNextPage) {
			onLoadNextPage?.();
		}
	}, [
		virtualizer.getVirtualItems,
		count,
		hasNextPage,
		isFetchingNextPage,
		onLoadNextPage,
	]);

	return (
		<div
			ref={parentRef}
			className="scrollbar-brand h-popup-block overflow-auto py-2 pr-1 pl-2"
		>
			<ul
				className="relative w-full rounded border-1 border-gray-300 bg-white"
				style={{ height: `${virtualizer.getTotalSize()}px` }}
			>
				{virtualizer.getVirtualItems().map((virtualItem) => {
					const isLoadingItem = virtualItem.index > count - 1;

					return (
						<li
							key={virtualItem.key}
							className="absolute top-0 left-0 w-full border-gray-300 not-first:border-t even:bg-gray-100"
							style={{
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`,
							}}
						>
							{isLoadingItem ? <p>loading more...</p> : renderItem(virtualItem)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
