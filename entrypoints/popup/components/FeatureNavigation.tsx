import { Link, useParams } from "@tanstack/react-router";

type Props = {
	currentFeature: "notifications" | "projects" | "issues";
};

/**
 * 機能間ナビゲーションタブコンポーネント
 */
export const FeatureNavigation: React.FC<Props> = ({ currentFeature }) => {
	const { spaceDomain } = useParams({ from: "/$spaceDomain" });

	const features = [
		{
			key: "notifications" as const,
			label: "お知らせ",
			path: "/notifications",
		},
		{ key: "projects" as const, label: "プロジェクト", path: "/projects" },
		{ key: "issues" as const, label: "課題", path: "/issues" },
	];

	return (
		<nav className="border-gray-200 border-b">
			<div className="flex space-x-1">
				{features.map(({ key, label, path }) => {
					const isActive = currentFeature === key;
					return (
						<Link
							className={`rounded-t-lg px-4 py-2 font-medium text-sm transition-colors ${
								isActive
									? "border-blue-600 border-b-2 bg-white text-blue-600"
									: "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
							}`}
							key={key}
							params={{ spaceDomain }}
							to={`/$spaceDomain${path}`}
						>
							{label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};
