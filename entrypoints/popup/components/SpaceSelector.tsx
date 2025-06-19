import { useNavigate } from "@tanstack/react-router";
import { useSpaces } from "@/hooks/useSpaces";

type Props = {
	currentSpaceDomain: string;
	currentPath: string;
};

/**
 * スペース選択ドロップダウンコンポーネント
 */
export const SpaceSelector: React.FC<Props> = ({
	currentSpaceDomain,
	currentPath,
}) => {
	const spaces = useSpaces();
	const navigate = useNavigate();

	if (spaces.isLoading || spaces.items.length === 0) {
		return <div className="text-gray-600 text-sm">{currentSpaceDomain}</div>;
	}

	return (
		<div className="relative">
			<select
				className="rounded border border-gray-300 bg-white px-3 py-1 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
				onChange={(e) => {
					const newSpaceDomain = e.target.value;
					if (newSpaceDomain !== currentSpaceDomain) {
						navigate({ to: `/${newSpaceDomain}${currentPath}` });
					}
				}}
				value={currentSpaceDomain}
			>
				{spaces.items.map((space) => (
					<option key={space.spaceDomain} value={space.spaceDomain}>
						{space.spaceDomain}
					</option>
				))}
			</select>
		</div>
	);
};
