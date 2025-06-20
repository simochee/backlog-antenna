import tinycolor from "tinycolor2";

type Props = {
	color: string;
	children: React.ReactNode;
};

export const StatusBadge: React.FC<Props> = ({ color, children }) => {
	const textColor = tinycolor(color).getLuminance() < 0.5 ? "#fff" : "#000";

	return (
		<span
			className="rounded-full px-2 py-0.5 text-2xs leading-none"
			style={{ backgroundColor: color, color: textColor }}
		>
			{children}
		</span>
	);
};
