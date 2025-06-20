import { TabLink } from "../TabLink";

export type Props = {
	buttons: ({ children: React.ReactNode; id?: string } & (
		| { href: string }
		| { onClick: () => void }
	))[];
};

export const ActionButtons: React.FC<Props> = ({ buttons }) => {
	return (
		<div className="col-start-2 flex flex-wrap">
			{buttons.map((item, i) =>
				"href" in item ? (
					<TabLink
						key={item.id ?? `link-${i}`}
						className="border-gray-300 border-r px-3 text-gray-500 text-xs leading-tight last:border-0 hover:text-black hover:underline"
						href={item.href}
					>
						{item.children}
					</TabLink>
				) : (
					<button
						key={item.id ?? `button-${i}`}
						type="button"
						className="border-gray-300 border-r px-3 text-gray-500 text-xs leading-tight last:border-0 hover:text-black hover:underline"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							item.onClick();
						}}
					>
						{item.children}
					</button>
				),
			)}
		</div>
	);
};
