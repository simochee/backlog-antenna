import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export const Route = createFileRoute("/$spaceDomain/notifications")({
	component: () => {
		const parentRef = useRef<HTMLDivElement>(null);

		const virtualizer = useVirtualizer({
			count: 1000,
			estimateSize: () => 35,
			getScrollElement: () => parentRef.current,
		});

		return (
			<div className="h-[600px] overflow-auto" ref={parentRef}>
				<ul
					className="relative w-full"
					style={{ height: `${virtualizer.getTotalSize()}px` }}
				>
					{virtualizer.getVirtualItems().map((virtualItem) => (
						<li
							className="absolute top-0 left-0 w-full"
							key={virtualItem.key}
							style={{
								height: `${virtualItem.size}px`,
								transform: `translateY(${virtualItem.start}px)`,
							}}
						>
							hello {virtualItem.key}
						</li>
					))}
				</ul>
			</div>
		);
	},
	errorComponent: ({ reset }) => (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			<div className="text-center text-red-600">
				お知らせの取得に失敗しました
				<button
					className="ml-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
					onClick={reset}
					type="button"
				>
					再読み込み
				</button>
			</div>
		</div>
	),
	pendingComponent: () => (
		<div>
			<h2 className="mb-4 font-bold text-gray-800 text-xl">お知らせ一覧</h2>
			<div className="text-center text-gray-600">お知らせを読み込み中...</div>
		</div>
	),
});
