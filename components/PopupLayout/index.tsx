import { Link, useParams } from "@tanstack/react-router";
import icon from "~/assets/icon.svg";
import { SpaceSwitch } from "../SpaceSwitch";

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
			<aside className="flex h-full flex-col bg-brand-500">
				<div className="flex items-center px-2 py-4">
					<img className="size-8" src={icon} alt="" />
				</div>
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
				<div className="mt-auto pb-2">
					<SpaceSwitch />
				</div>
			</aside>
			<main className="h-full">{children}</main>
		</div>
	);
};
