type Props = {
	length: number;
	children: React.ReactNode;
};

export const SkeltonList: React.FC<Props> = ({ length, children }) => {
	return (
		<div className="scrollbar-brand relative overflow-y-scroll px-1 py-2 pl-2">
			<ul className="overflow-hidden rounded border-1 border-gray-300 border-b-0 bg-white">
				{Array.from({ length })
					.map((_, i) => i)
					.map((n) => (
						<li
							key={n}
							className="border-gray-300 not-first:border-t even:bg-gray-50"
						>
							{children}
						</li>
					))}
			</ul>
			<div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-base to-transparent" />
		</div>
	);
};
