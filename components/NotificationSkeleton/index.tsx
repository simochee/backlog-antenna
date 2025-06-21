/**
 * 通知アイテムのスケルトンコンポーネント
 * データローディング中に表示される
 */
export const NotificationSkeleton: React.FC = () => {
	return (
		<div className="group relative grid grid-cols-[1fr_auto] gap-3 px-4 py-2">
			<div className="grid gap-1">
				{/* 送信者情報行 */}
				<div className="flex items-center gap-1">
					{/* アバター */}
					<div className="size-4 animate-pulse rounded-full bg-gray-200" />
					{/* 送信者名とアクション */}
					<div
						className="h-3 animate-pulse rounded bg-gray-200"
						style={{ width: "160px" }}
					/>
				</div>

				{/* タイトル行 */}
				<div
					className="h-4 animate-pulse rounded bg-gray-200"
					style={{ width: "224px" }}
				/>

				{/* プロジェクト・課題キー行 */}
				<div
					className="h-3 animate-pulse rounded bg-gray-200"
					style={{ width: "96px" }}
				/>
			</div>

			<div className="flex flex-col items-end gap-1">
				{/* 時刻 */}
				<div
					className="h-3 animate-pulse rounded bg-gray-200"
					style={{ width: "48px" }}
				/>

				{/* ステータスバッジ */}
				<div
					className="h-5 animate-pulse rounded-full bg-gray-200"
					style={{ width: "64px" }}
				/>
			</div>
		</div>
	);
};
