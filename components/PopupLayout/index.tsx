import { Link, useParams } from "@tanstack/react-router";

type Props = {
	children: React.ReactNode;
	currentFeature?: "notifications" | "projects" | "issues";
};

export const PopupLayout: React.FC<Props> = ({
	children,
	currentFeature = "notifications",
}) => {
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
		<div className="grid grid-cols-[120px_1fr]">
			<aside>
				<nav className="grid gap-4">
					{features.map(({ key, label, path }) => {
						const isActive = currentFeature === key;
						return (
							<Link
								className={`px-3 py-2 text-sm transition-colors ${
									isActive
										? "font-medium text-blue-600"
										: "text-gray-700 hover:text-blue-600"
								}`}
								key={key}
								params={{ spaceDomain }}
								to={`/$spaceDomain${path}`}
							>
								{label}
							</Link>
						);
					})}
				</nav>
			</aside>
			<main>{children}</main>
		</div>
	);
};
