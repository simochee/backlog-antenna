/**
 * 課題アイテムのスケルトンコンポーネント
 * データローディング中に表示される
 */
export const IssueItemSkeleton: React.FC = () => {
	return (
		<div className="flex h-20 w-full flex-col justify-center gap-1 px-3">
			{/* 第1行: 課題タイプバッジ、課題キー、ステータスバッジ */}
			<div className="flex items-center gap-1">
				{/* 課題タイプバッジ */}
				<div
					className="h-5 animate-pulse rounded-full bg-gray-200"
					style={{ width: "48px" }}
				/>
				{/* 課題キー */}
				<div
					className="h-3 animate-pulse rounded bg-gray-200"
					style={{ width: "72px" }}
				/>
				{/* ステータスバッジ */}
				<div className="ml-auto">
					<div
						className="h-5 animate-pulse rounded-full bg-gray-200"
						style={{ width: "64px" }}
					/>
				</div>
			</div>

			{/* 第2行: 課題タイトル */}
			<div
				className="h-4 animate-pulse rounded bg-gray-200"
				style={{ width: "280px" }}
			/>

			{/* 第3行: 担当者情報 */}
			<div className="flex items-center gap-1">
				{/* アバター */}
				<div className="size-4 animate-pulse rounded-full bg-gray-200" />
				{/* 担当者名 */}
				<div
					className="h-3 animate-pulse rounded bg-gray-200"
					style={{ width: "96px" }}
				/>
			</div>
		</div>
	);
};
