import type { FC } from "react";

export const NotFoundPage: FC = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="text-center">
				<h1 className="mb-4 font-bold text-6xl text-gray-900">404</h1>
				<h2 className="mb-2 font-semibold text-gray-600 text-xl">
					スペースが見つかりません
				</h2>
				<p className="text-gray-500">
					指定されたスペースは存在しないか削除されています。
				</p>
			</div>
		</div>
	);
};
