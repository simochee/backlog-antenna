type Props = {
	children: React.ReactNode;
};

export const PopupLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="grid h-full grid-cols-[120px_1fr]">
			<aside>
				<p>Navigation</p>
			</aside>
			<main h-full>{children}</main>
		</div>
	);
};
