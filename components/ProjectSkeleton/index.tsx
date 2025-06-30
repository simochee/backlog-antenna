/**
 * プロジェクトアイテムのスケルトンコンポーネント
 * データローディング中に表示される
 */
export const ProjectSkeleton: React.FC = () => {
	return (
		<div className="grid w-full grid-cols-[auto_1fr] gap-y-1 p-4">
			<div className="grid gap-1">
				{/* プロジェクトアイコン */}
				<div className="size-7 animate-pulse rounded bg-gray-200" />
			</div>

			<div className="grid gap-1 px-3">
				{/* プロジェクト名とキー */}
				<div className="flex items-end gap-1 self-center">
					{/* プロジェクト名 */}
					<div
						className="h-4 animate-pulse rounded bg-gray-200"
						style={{ width: "120px" }}
					/>
					{/* プロジェクトキー */}
					<div
						className="h-3 animate-pulse rounded bg-gray-200"
						style={{ width: "60px" }}
					/>
				</div>

				{/* アクションボタン群 */}
				<div className="flex gap-1 pt-1">
					<div
						className="h-6 animate-pulse rounded bg-gray-200"
						style={{ width: "64px" }}
					/>
					<div
						className="h-6 animate-pulse rounded bg-gray-200"
						style={{ width: "48px" }}
					/>
					<div
						className="h-6 animate-pulse rounded bg-gray-200"
						style={{ width: "56px" }}
					/>
					<div
						className="h-6 animate-pulse rounded bg-gray-200"
						style={{ width: "52px" }}
					/>
				</div>
			</div>
		</div>
	);
};
