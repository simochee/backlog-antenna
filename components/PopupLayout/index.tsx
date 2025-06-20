import { Link, useParams } from "@tanstack/react-router";

type Props = {
	children: React.ReactNode;
};

const NAV_LINKS = [
	{
		text: "お知らせ",
		path: "notifications",
	},
	{
		text: "プロジェクト",
		path: "projects",
	},
	{
		text: "課題",
		path: "issues",
	},
] as const;

export const PopupLayout: React.FC<Props> = ({ children }) => {
	const { spaceDomain } = useParams({ strict: false });

	return (
		<div className="grid h-full grid-cols-[180px_1fr]">
			<aside className="bg-brand-500">
				{spaceDomain && (
					<nav className="grid">
						{NAV_LINKS.map(({ text, path }) => (
							<Link
								key={path}
								to={`/$spaceDomain/${path}`}
								params={{ spaceDomain }}
								className="grid h-12 items-center px-2 font-bold"
								inactiveProps={{ className: "text-white" }}
								activeProps={{ className: "bg-base text-brand-500" }}
							>
								{text}
							</Link>
						))}
					</nav>
				)}
			</aside>
			<main className="h-full">{children}</main>
		</div>
	);
};
