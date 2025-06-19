import type { FC } from "react";
import type { BacklogSpace } from "@/types/space";
import { SpaceForm } from "./SpaceForm";

type Props = {
	space: BacklogSpace;
	onDelete: (spaceDomain: string) => void;
	onUpdate: (data: BacklogSpace) => void;
};

export const SpaceItem: FC<Props> = ({ space, onDelete, onUpdate }) => {
	return (
		<div>
			<h3>{space.spaceDomain}</h3>
			<button onClick={() => onDelete(space.spaceDomain)} type="button">
				Delete
			</button>
			<details>
				<summary>Edit</summary>
				<SpaceForm
					initialValue={space}
					onSubmit={async (data) => onUpdate({ ...space, ...data })}
				/>
			</details>
		</div>
	);
};
