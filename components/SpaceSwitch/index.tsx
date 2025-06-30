import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useParams } from "@tanstack/react-router";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";
import { useSpaces } from "@/hooks/useSpaces";

export const SpaceSwitch: React.FC = () => {
	const { spaceDomain } = useParams({ strict: false });
	const { items } = useSpaces();

	const currentSpace = items.find((space) => space.spaceDomain === spaceDomain);

	return (
		<Menu>
			<MenuButton as={Fragment}>
				{({ active }) => (
					<div className="px-1">
						<button
							type="button"
							className={clsx(
								"grid grid-cols-[auto_1fr] items-center gap-2 rounded p-2 outline-dashed outline-brand-200 hover:outline focus:outline",
								active ? "outline" : "outline-0",
							)}
						>
							<span className="block size-6 rounded-xs bg-slate-300" />
							<span className="line-clamp-1 overflow-hidden break-all text-white">
								{currentSpace?.spaceDomain}
							</span>
						</button>
					</div>
				)}
			</MenuButton>
			<MenuItems
				anchor="right end"
				className="max-w-xs translate-x-1 rounded border border-gray-300 bg-white shadow-lg outline-0"
			>
				{items.map((space) => (
					<MenuItem key={space.spaceDomain} as={Fragment}>
						<Link
							className="flex w-full items-center gap-2 p-2 hover:bg-yellow-50 active:bg-yellow-50"
							to="/$spaceDomain/notifications"
							params={{ spaceDomain: space.spaceDomain }}
						>
							<span className="block size-6 rounded-xs bg-slate-300" />
							{space.spaceDomain}
						</Link>
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
};
