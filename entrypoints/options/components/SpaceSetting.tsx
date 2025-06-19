import type { FC } from "react";
import { useSpaces } from "@/hooks/useSpaces";
import { SpaceForm } from "./SpaceForm";
import { SpaceItem } from "./SpaceItem";

export const SpaceSetting: FC = () => {
	const spaces = useSpaces();

	return (
		<div>
			<SpaceForm onSubmit={async (data) => spaces.append(data)} />
			<ul>
				{spaces.items.map((space) => (
					<li key={space.spaceDomain}>
						<SpaceItem
							onDelete={() => spaces.remove(space.spaceDomain)}
							onUpdate={(data) => spaces.update(data)}
							space={space}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
